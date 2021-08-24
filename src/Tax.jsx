
import React,{useState} from 'react';
import { Formik } from 'formik';
import styled from 'styled-components' 
import {apiRes} from './consts'
const TaxContainer = styled.div`
 width:50%;
 height: 90vh;
 box-shadow:1px 1px 5px black;
 display: flex;
 flex-direction: column;
 align-items: start;
 padding: 1%;
 justify-content: space-evenly;
`
const Form = styled.form`
 width: 100%;
 display: flex;
 padding:1%;
 justify-content: space-around;
`
const SearchContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items:start;
justify-content: space-evenly;
height: 90%;
`
const Category = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: space-around;
height: 50%;
`
const Items = styled.div`
margin-left: 5%;
overflow-y: scroll;
`
const gourByCategory=(array)=>{
 const categories = [];

 array.forEach((res)=>{
   let index = categories.findIndex(c=>c?.id == res?.category?.id);
   if(index==-1){
       categories.push({...res.category,items:[res]});
   } else {
       categories[index].items?.push(res); 
   } 
 })
 return categories;
 
}
 const Tax = () =>{ 
const handleSearch=(e)=>{
  const temp = apiRes.filter(res=>res.name.indexOf(e.target.value)!=-1);
  console.log(temp)
  setFilter(gourByCategory(temp));
}
const selectAll=(id)=>{
    let i = filtered.findIndex(item=>item.id==id);
    if( filtered[filtered.findIndex(item=>item.id===id)].items.some(r=> selected.indexOf(r.id) >= 0))
    {
  
    } else
    setSelected([...selected,...filtered[filtered.findIndex(item=>item.id===id)].items.map(item=>item.id)]);
}
const select = (id)=>{
    const index = selected.indexOf(id);
    console.log(index);
    if(index == -1)
    setSelected([...selected,id])
    else{ 
    console.log(id)
    setSelected(selected.filter(item=>item!==id));
    }
}
const [filtered,setFilter] =useState(gourByCategory(apiRes));
const [selected,setSelected]=useState([]);

  return <TaxContainer>
     <h1>Add Tax</h1>
     <Formik
       initialValues={{ taxLetters: '', taxDigits: 0 }}
       validate={values => {
         const errors = {};
         if (!values.taxLetters && !values.taxDigits) {
           errors.tax = 'Required';
         }         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <Form onSubmit={handleSubmit}>
           <input
             style={{flex:2}}
             type="text"
             name="taxLetters"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.taxLetters}
           />
           {errors.taxLetters && touched.taxLetters }
           <input
             type="number"
             name="taxDigits"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.taxDigits}
           />
           {errors.taxDigits && touched.taxDigits }
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         
          
         </Form>
       )}
     </Formik>
     <SearchContainer>
         <input
             type="text"
             name="search"
             onChange={handleSearch}
           />
         {filtered.map(cat=>{
             return <Category key={cat?.id}>
<div>
  <input onChange={()=>selectAll(cat.id)}  type="checkbox" id={cat.id} name={cat.id}
         />
  <label htmlFor={cat.id}>{cat?.name ?? "cat na"}</label>
  </div>
                 <Items>
                     {cat?.items?.map(item=><div>
  <input checked={selected.indexOf(item.id)!=-1} onChange={()=>select(item.id)} type="checkbox" id={item.id} name={item.id}
         />
  <label htmlFor={item.id}>{item?.name}</label>
  </div>
 
                     )}
                 </Items>

             </Category>
         })}
     </SearchContainer>
   </TaxContainer>
 };
 
 export default Tax;