import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAd, deleteAd, addAd } from '../store/actions/adActions';
import { Container, Row, Col, Badge, Button, ListGroup, Modal, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../pages/adminDashboard.css';
const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [newAd, setNewAd] = useState(() => ({
    media: null,
    startTime: localStorage.getItem('startTime') || '',
    endTime: localStorage.getItem('endTime') || ''
  }));
  const ads = useSelector(state => state.ads);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editAd, setEditAd] = useState(null);
  const [formErrors, setFormErrors] = useState({
    media: '',
    startTime: '',
    endTime: ''
  });

  useEffect(() => {
    localStorage.setItem('startTime', newAd.startTime);
    localStorage.setItem('endTime', newAd.endTime);
  }, [newAd.startTime, newAd.endTime]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleUpdate = (ad) => {
    if (!newAd.media || !newAd.startTime || !newAd.endTime) {
      setFormErrors({
        media: newAd.media ? '' : 'Media is required',
        startTime: newAd.startTime ? '' : 'Start Time is required',
        endTime: newAd.endTime ? '' : 'End Time is required'
      });
      return;
    }

    dispatch(updateAd({ id: ad.id, ...newAd }));
    handleCloseModal();
  };

  const handleDelete = (ad) => {
    dispatch(deleteAd(ad));
    setShowConfirmation(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditAd(null);
    setNewAd({
      media: null,
      startTime: '',
      endTime: ''
    });
    setFormErrors({
      media: '',
      startTime: '',
      endTime: ''
    });
  };

  const handleChange = (e) => {
    if (e.target.name === 'media') {
      setNewAd({ ...newAd, media: e.target.files[0] });
    } else {
      setNewAd({ ...newAd, [e.target.name]: e.target.value });
    }
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const handleCreateAd = () => {
    if (!newAd.media || !newAd.startTime || !newAd.endTime) {
      setFormErrors({
        media: newAd.media ? '' : 'Media is required',
        startTime: newAd.startTime ? '' : 'Start Time is required',
        endTime: newAd.endTime ? '' : 'End Time is required'
      });
      return;
    }
    const uniqueId = uuidv4();
    dispatch(addAd({ ...newAd, id: uniqueId }));
    handleCloseModal();
  };
  

  return (
    <Container className="admin-dashboard">
      <Row className="mb-2">
        <Col className="col-9">
          <Badge variant="primary">
            <h1>Admin Dashboard</h1>
          </Badge>
        </Col>
        <Col className="col-3">
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
      <Col>
        <Button onClick={handleShowModal}>Create New Ad</Button>{' '}
      </Col>
      <Row>
        <Col className="text-right"></Col>
        <div className="d-flex justify-content-center">
          <Badge bg="warning">
            <h2 className="text-center">My Advertisement</h2>
          </Badge>
        </div>
      </Row>

      <ListGroup>
  {ads.map((ad, index) => (
    <ListGroup.Item key={ad.id || index}>
      <Card>
        <Card.Img src={URL.createObjectURL(ad.media)} />
        <Card.Body>
          <Card.Text>
            Date: {ad.startTime} -- {ad.endTime}
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              setEditAd(ad);
              setShowModal(true);
            }}
          >
            Update
          </Button>

          <Button
            variant="danger"
            onClick={() => {
              setEditAd(ad);
              setShowConfirmation(true);
            }}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </ListGroup.Item>
  ))}
</ListGroup>


      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this ad?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(editAd)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editAd ? 'Update' : 'Add'} Ad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Media:</Form.Label>
              <Form.Control type="file" name="media" onChange={handleChange} />
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
          <Button variant="primary" onClick={editAd ? handleUpdate : handleCreateAd}>
            {editAd ? 'Update' : 'Create Ad'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
