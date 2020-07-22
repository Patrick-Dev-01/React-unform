import React, { useEffect, useState, useRef } from 'react';
import { Form } from '@unform/web';
import { Scope } from "@unform/core";
import * as Yup from 'yup';
import './App.css';

import Input from './components/Form/input';

function App() {

  const formRef = useRef(null);

  // const initialData = {
  //   email: 'patrick@teste.com',
  //   address: {
  //     city: 'Rio do Sul',
  //   }
  // }

  async function handleSubmit(data, { reset }){

    try{
        const schema = Yup.object().shape({
          name: Yup.string().required('O nome é obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('O e-mail é obrigatório'),
      
            address: Yup.object().shape({
              city: Yup.string()
              .min(3, 'No minimo 3 caracteres').required('A cidade é obrigatória')
            })
        });

        await schema.validate(data, {
          abortEarly: false
        })

        console.log(data)

        // limpar os erros e os campos
        formRef.current.setErrors({});
        reset();
    }

    catch(err){
      // se foi um erro de validação 
      if(err instanceof Yup.ValidationError){
        const errorMessages = {}

        // para cada erro de validação
        err.inner.forEach(error => {
          // mostrar em qual input deu o erro e a mensagen
          errorMessages[error.path] = error.message;
        })

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  // preencher dados do formulario automatica simulando uma API
  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        name: 'Patrick Rodrigues',
        email: 'diego@rocketseat.com.br',
        address: {
          city: 'Rio do Sul'
        }
      })
    }, 2000)
  }, [])

  return (
    <div className="App">
      <h1>Hello World</h1>

      <Form ref={formRef}  onSubmit={handleSubmit}>
        <Input name="name" />
        <Input name="email"/>
        <Input type="password" name="password" />

        <Scope path="address">
          <Input name="street" />
          <Input name="neighbordhood" />
          <Input name="city" />
          <Input name="number" />
        </Scope>

        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;
