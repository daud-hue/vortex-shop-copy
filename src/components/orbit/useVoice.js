import {useEffect, useRef, useState} from 'react';
export default function useVoice(onTranscript) {
  const recognition = useRef(null); const callback = useRef(onTranscript); callback.current = onTranscript;
  const [listening,setListening] = useState(false); const [speaking,setSpeaking] = useState(false); const [error,setError] = useState('');
  const supported = typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const stop = () => { recognition.current?.abort(); if(speechSupported) window.speechSynthesis.cancel(); setListening(false); setSpeaking(false); };
  useEffect(()=>()=>{recognition.current?.abort(); if(speechSupported) window.speechSynthesis.cancel();},[speechSupported]);
  const listen = () => {
    if(listening){recognition.current?.stop();return;}
    stop(); setError('');
    if(!supported){setError('A böngésződ nem támogatja a diktálást. Írj üzenetet, vagy próbáld Chrome-ban.');return;}
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new Recognition(); rec.lang='hu-HU'; rec.interimResults=false; recognition.current=rec;
    rec.onresult=e=>callback.current(e.results[0][0].transcript);
    rec.onend=()=>setListening(false);
    rec.onerror=e=>{setListening(false);if(e.error!=='aborted')setError(e.error==='not-allowed'?'Engedélyezd a mikrofont a böngészőben, vagy írj üzenetet.':'A diktálás nem sikerült. Próbáld újra, vagy írj üzenetet.');};
    try {rec.start();setListening(true);} catch {setError('A mikrofon most nem indítható. Próbáld újra.');}
  };
  const speak = text => {
    stop(); if(!speechSupported){setError('Ebben a böngészőben nincs felolvasás. A választ elolvashatod.');return;}
    const plain = text.replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/[*#_`]/g,'');
    const utterance = new SpeechSynthesisUtterance(plain); utterance.lang='hu-HU'; utterance.rate=1;
    const voice=window.speechSynthesis.getVoices().find(v=>v.lang.startsWith('hu')); if(voice)utterance.voice=voice;
    utterance.onstart=()=>setSpeaking(true); utterance.onend=()=>setSpeaking(false); utterance.onerror=()=>setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };
  return {listening,speaking,supported,speechSupported,error,listen,speak,stop};
}