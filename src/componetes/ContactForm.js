import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import React, { useRef } from "react";

const ContactForm = () => {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(formRef);
    const formData = new FormData(formRef.current);
    alert(formData);
    fetch("https://script.google.com/macros/s/AKfycbwHQO8hBfMS12FNGnRmcPThTDzAkdfSMS9brUVbQUR-alKKAClmqPRXZydzUOFb7mosfQ/exec", {
      method: 'POST',
      body: formData,
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        alert(data.msg);
      })
      .catch(err => console.log(err));
  };

  return (
    <Container style={{ width: "70%", height: "100vh", alignItems: "center", display: "flex", justifyContent: "center" }}>
      <Form style={{ textAlign: "left", backgroundColor: "gray", padding: "5%", borderRadius: "15px" }} ref={formRef} onSubmit={handleSubmit}>
        <h3>Contact Form</h3>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Ingresa el nombre" name="Name" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email   </Form.Label>
          <Form.Control type="email" placeholder="Ingresa email" name="Email" required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="Description">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} name="Message" required />
        </Form.Group>
        <Button style={{ float: "right" }} variant="success" type="submit">
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default ContactForm;