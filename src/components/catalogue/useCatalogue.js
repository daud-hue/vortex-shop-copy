import {useEffect,useState} from 'react';
import {useInfiniteQuery,useQuery} from '@tanstack/react-query';
import {useSearchParams} from 'react-router-dom';
import {base44} from '@/api/base44Client';
export const categories=['all','audio','wearables','footwear','objects','lighting'];
export default function useCatalogue() {
  const [params,setParams]=useSearchParams(); const requested=params.get('category')||'all'; const category=categories.includes(requested)?requested:'all';
  const [search,setSearch]=useState(''); const [term,setTerm]=useState(''); const [sort,setSort]=useState('-created_date');
  useEffect(()=>{const timer=setTimeout(()=>setTerm(search.trim()),300);return()=>clearTimeout(timer);},[search]);
  const query={...(category==='all'?{}:{category}),...(term?{name:{$regex:term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),$options:'i'}}:{})};
  const list=useInfiniteQuery({queryKey:['catalogue',category,term,sort],queryFn:({pageParam})=>base44.entities.Product.filter(query,{sort,limit:12,...(pageParam?{cursor:pageParam}:{})}),initialPageParam:undefined,getNextPageParam:last=>last.has_more?last.next_cursor:undefined,staleTime:60000});
  const total=useQuery({queryKey:['catalogue-count',category,term],queryFn:()=>base44.entities.Product.count(query),staleTime:60000});
  return {...list,products:list.data?.pages.flatMap(p=>p.items)||[],total:total.data,category,setCategory:value=>setParams(value==='all'?{}:{category:value}),search,setSearch,sort,setSort};
}