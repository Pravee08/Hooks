import React, {useReducer, useState} from 'react';
import styled from 'styled-components';

const ContactSpace = styled.div`
   display: flex;
   flex-direction: column;
   border: 1px solid;
   width: auto;
`;

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
  &:hover {
    background-color: palevioletred;
    color: white;
  }
`;

const initialState = {contactAdded:[]}
  
const reducer = (state = initialState, action) => {
   debugger;
   switch (action.type) {
     case "REMOVE_CONTACT":
       return{...state,contactAdded:state.contactAdded.filter((x) => x.id !== action.item.id)}
     case "ADD_CONTACT":
         return{...state,contactAdded:[...state.contactAdded,action.item]}
     default:
        return state;
   }
}

 
const Formcontent = () => {
   const [validator, setValidator] = useState(false);
   const [state, dispatch] = useReducer(reducer, initialState);
   const removeContact = (item) => {
      dispatch({ type: 'REMOVE_CONTACT', item });
    }
    
    const addContact = (item) => {
      dispatch({ type: 'ADD_CONTACT', item })
    }

   const contactListFunc = (e,action,item) =>{
      e.preventDefault();
      const form = document.querySelector('#contact-form')
      const contact = {
         id: state.contactAdded.length,
         name: form.elements['form_name'].value,
         phone: form.elements['form_phone'].value,
         address: form.elements['form_message'].value
      }
      if(action==="add"){
         addContact(contact);
         form.reset();
      } else{
         removeContact(item);
         form.reset();
      }
      setValidator(false);
   }
   const handleInput=()=>{
      setValidator(false);
      const form = document.querySelector('#contact-form')
      if(form.elements['form_name'].value && form.elements['form_name'].value.length>0
      && form.elements['form_phone'].value && form.elements['form_phone'].value.length>0
      && form.elements['form_message'].value && form.elements['form_message'].value.length>0){
         setValidator(true);
      }
   }
    return (
        <div className = "row">
               <div className = "col-md-4">
                  <form id="contact-form">
                     <div className="controls">
                        <div className="row">
                           <div className="col-md-12">
                              <div className="form-group">
                                 <label htmlFor="form_name">Name</label>
                                 <input id="form_name" type="text" name="name" className="form-control" placeholder="Please enter your name" onBlur={()=>{handleInput()}} />
                              </div>
                           </div>
                        </div>
                        <div className="row">
                           <div className="col-md-12">
                              <div className="form-group">
                                 <label htmlFor="form_phone" className="label">Phone Number</label>
                                    <input  id="form_phone" name="phone" required type="text" className="form-control" placeholder="e.g. 234-80-988-7676" onBlur={()=>{handleInput()}}/>
                              </div>
                           </div>
                        </div>
                        <div className="row">
                           <div className="col-md-12">
                              <div className="form-group">
                                 <label htmlFor="form_message" className="label">Address</label>
                                 <textarea id="form_message" name="address" className="form-control" placeholder="Address of you" rows="4" onBlur={()=>{handleInput()}}></textarea>
                                 <div className="help-block with-errors"></div>
                              </div>
                           </div>
                           <div className="col-md-12">
                              <button type="Submit" disabled={!validator} className="btn btn-success btn-send" onClick={(e)=>{contactListFunc(e,"add")}}>Add Contacts</button>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
               <div className = "col-md-8">
                  <div className = "col-md-12">
                     {state.contactAdded.length ?
                     (
                        <div  className = "col-md-12">
               {state.contactAdded.map((item,id) => (
                  <div key={id} className = "col-md-4 float-left mt-2">
                  <ContactSpace>
                     <p>{item.name}</p>
                     <p>{item.phone}</p>
                     <p>{item.address}</p>
                  <Button type="Submit" className="btn bg-danger" onClick={(e)=>{contactListFunc(e,"remove",item)}}>Delete</Button>
                  </ContactSpace>
                  </div>
                     ))}</div>):<p></p>
                     }
                  </div>
               </div>
            </div>
      );
}
 
export default React.memo(Formcontent);