import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAd, deleteAd, addAd } from '../store/actions/adActions';
import { Container, Row, Col, Badge, Button, ListGroup, Modal, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../pages/adminDashboard.css';

const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [newAd, setNewAd] = useState({ media: '', startTime: '', endTime: '' });
  const ads = useSelector(state => state.ads);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };


  
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditAd(null);
    setNewAd({ media: '', startTime: '', endTime: '' });
    setFormErrors({ media: '', startTime: '', endTime: '' });
  };

  const handleChange = (e) => {
    setNewAd({ ...newAd, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const handleCreateAd = () => {
    if (!newAd.media || !newAd.startTime || !newAd.endTime) {
      setFormErrors({
        media: newAd.media ? '' : 'Media is required',
        startTime: newAd.startTime ? '' : 'Start Time is required',
        endTime: newAd.endTime ? '' : 'End Time is required    '  });
      return;
    }

    dispatch(addAd(newAd));
    handleCloseModal();
  };

  return (
    <Container className="admin-dashboard">
      <Row className="mb-3">
        <Col>
          <Badge variant="primary">
            <h1>Admin Dashboard</h1>
          </Badge>
        </Col>
          <Col><Button onClick={handleShowModal}>Create New Ad</Button> </Col>
        <Col className="text-right">
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
      <div className="d-flex justify-content-center">
  <Badge bg="warning">
    <h2 className="text-center">My Advertisement</h2>
  </Badge>
</div>

      <ListGroup>
        {ads.map((ad) => (
          <ListGroup.Item key={ad.id}>
            <Card>
              <Card.Body>
                <Card.Text>
                  Date: {ad.startTime} -- {ad.endTime}
                </Card.Text>
                <Button variant="primary" onClick={() => {setEditAd(ad); setShowModal(true)}}>
                  Update
                </Button>

                <Button variant="danger" onClick={() => { setEditAd(ad); setShowConfirmation(true); }}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
     
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{'Add'} Ad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Media:</Form.Label>
              <Form.Control type="file" name="media" value={newAd.media} onChange={handleChange} />
              {formErrors.media && <p className="text-danger">{formErrors.media}</p>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Start Time:</Form.Label>
              <Form.Control type="time" name="startTime" value={newAd.startTime} onChange={handleChange} />
              {formErrors.startTime && <p className="text-danger">{formErrors.startTime}</p>}
            </Form.Group>
            <Form.Group>
              <Form.Label>End Time:</Form.Label>
              <Form.Control type="time" name="endTime" value={newAd.endTime} onChange={handleChange} />
              {formErrors.endTime && <p className="text-danger">{formErrors.endTime}</p>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={ handleCreateAd}>
           Create Ad
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;