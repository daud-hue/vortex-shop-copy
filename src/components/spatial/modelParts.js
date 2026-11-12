import * as T from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export default function modelParts(group) {
  const metal = new T.MeshStandardMaterial({color: '#b8c7d7', metalness: .88, roughness: .24});
  const blue = new T.MeshStandardMaterial({color: '#254bcd', metalness: .65, roughness: .29});
  const dark = new T.MeshStandardMaterial({color: '#101625', metalness: .25, roughness: .7});
  const lime = new T.MeshStandardMaterial({color: '#dcf952', metalness: .2, roughness: .28});
  const light = new T.MeshStandardMaterial({color: '#fff6d5', emissive: '#fff1ba', emissiveIntensity: 2});
  const add = (geometry, material, position = [0,0,0], rotation = [0,0,0], scale = [1,1,1]) => {
    const mesh = new T.Mesh(geometry, material); mesh.position.set(...position); mesh.rotation.set(...rotation); mesh.scale.set(...scale); group.add(mesh); return mesh;
  };
  const box = (size, material, position, radius = .08, rotation) => add(new RoundedBoxGeometry(...size, 3, radius), material, position, rotation);
  const ring = (radius, tube, material, position, rotation, arc = Math.PI * 2) => add(new T.TorusGeometry(radius, tube, 12, 72, arc), material, position, rotation);
  const cylinder = (radius, height, material, position, rotation, top = radius) => add(new T.CylinderGeometry(top, radius, height, 64), material, position, rotation);
  const sphere = (size, material, position, scale) => add(new T.SphereGeometry(size, 32, 24), material, position, [0,0,0], scale);
  return {group, metal, blue, dark, lime, light, add, box, ring, cylinder, sphere};
}