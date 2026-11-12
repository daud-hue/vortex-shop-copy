import * as T from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';
import buildModel from '@/components/spatial/buildModel';
import headphoneStudio from '@/components/spatial/headphoneStudio';
export default function createStage(container, product, settings) {
  const renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.75)); renderer.toneMapping=T.ACESFilmicToneMapping; renderer.toneMappingExposure=1.4;
  container.appendChild(renderer.domElement); renderer.domElement.style.touchAction='pan-y';
  const scene=new T.Scene(); const camera=new T.PerspectiveCamera(38,1,.1,60); camera.position.set(3,1.7,5.9);
  const model=buildModel(product),referenceModel=model.userData.referenceHeadphones;
  if(referenceModel){camera.position.set(-3.4,1.1,5.8);camera.fov=34;renderer.toneMappingExposure=1.1;renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));}
  let env;
  if(referenceModel)env=headphoneStudio(renderer);
  else {const pmrem=new T.PMREMGenerator(renderer),room=new RoomEnvironment();env=pmrem.fromScene(room,.04);room.dispose();pmrem.dispose();}
  scene.environment=env.texture;
  scene.add(new T.HemisphereLight(referenceModel?'#ffffff':'#e7efff',referenceModel?'#292a2d':'#192642',referenceModel?.65:3));
  const key=new T.DirectionalLight('#ffffff',referenceModel?1.8:4);key.position.set(3,5,4);scene.add(key);
  const rim=new T.DirectionalLight(referenceModel?'#edf0f3':'#4b70ff',referenceModel?2:5);rim.position.set(-4,2,-2);scene.add(rim);
  scene.add(model);
  const ring=new T.Mesh(new T.TorusGeometry(1.7,.008,8,100),new T.MeshBasicMaterial({color:'#92a6c8',transparent:true,opacity:.3}));ring.rotation.x=Math.PI/2;ring.position.y=referenceModel?-1.78:-1.5;scene.add(ring);
  const controls=new OrbitControls(camera,renderer.domElement); controls.enableDamping=true;controls.enablePan=false;controls.enableZoom=false;controls.minDistance=3.6;controls.maxDistance=10;controls.target.set(0,0,0);controls.update();controls.saveState();renderer.domElement.style.touchAction='pan-y';
  const resize=new ResizeObserver(()=>{const w=container.clientWidth,h=container.clientHeight;if(w&&h){const bottom=referenceModel?Math.min(80,h*.18):0;renderer.setSize(w,h);renderer.setViewport(0,bottom,w,h-bottom);camera.aspect=w/(h-bottom);camera.updateProjectionMatrix();}});resize.observe(container);
  let visible=true,frame,last=0,wire=false;const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});observer.observe(container);
  const tick=time=>{
    frame=requestAnimationFrame(tick);const dt=Math.min((time-last)/1000,.05);last=time;
    if(!visible||document.hidden)return;
    controls.autoRotate=settings.current.spin;controls.autoRotateSpeed=referenceModel?.45:1.1;controls.update(dt);
    if(wire!==settings.current.wire){wire=settings.current.wire;model.traverse(m=>{if(m.isMesh)m.material.wireframe=wire;});}
    model.traverse(m=>{if(!m.userData.home)return;const target=m.userData.home.clone();if(settings.current.explode)target.add(m.userData.explode);m.position.lerp(target,.12);});
    renderer.render(scene,camera);
  };frame=requestAnimationFrame(tick);
  return {reset:()=>controls.reset(),zoom:factor=>{const offset=camera.position.clone().sub(controls.target);offset.setLength(T.MathUtils.clamp(offset.length()*factor,3.6,10));camera.position.copy(controls.target).add(offset);controls.update();},dispose:()=>{
    cancelAnimationFrame(frame);resize.disconnect();observer.disconnect();controls.dispose();
    const materials=new Set(),textures=new Set();scene.traverse(o=>{o.geometry?.dispose();if(o.material)materials.add(o.material);});materials.forEach(m=>{Object.values(m).forEach(value=>{if(value?.isTexture)textures.add(value);});m.dispose();});textures.forEach(texture=>texture.dispose());env.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();
  }};
}