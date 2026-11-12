import {useEffect,useState} from 'react';
const key='kinetic-demo-cart';
function restore() {
  try {
    const saved=JSON.parse(sessionStorage.getItem(key)||'[]');
    if(!Array.isArray(saved))return [];
    return saved.filter(item=>item&&typeof item.product_id==='string'&&typeof item.product_name==='string'&&Number.isFinite(item.price)&&item.price>=0&&Number.isInteger(item.quantity)&&item.quantity>0);
  } catch {return [];}
}
export default function useSessionCart() {
  const [items,setItems]=useState(restore);
  useEffect(()=>{try{sessionStorage.setItem(key,JSON.stringify(items));}catch{/* Cart stays usable when browser storage is blocked. */}},[items]);
  return [items,setItems];
}