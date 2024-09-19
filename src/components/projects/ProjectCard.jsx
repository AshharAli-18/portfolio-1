import React, { useContext, useState } from 'react';
import {
  Button, Card, Badge, Col, Modal
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import ReactMarkdown from 'react-markdown';

const styles = {
  badgeStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 5,
  },
  cardStyle: {
    borderRadius: 10,
  },
  cardTitleStyle: {
    fontSize: 24,
    fontWeight: 700,
  },
  cardTextStyle: {
    textAlign: 'left',
  },
  linkStyle: {
    textDecoration: 'none',
    padding: 10,
  },
  buttonStyle: {
    margin: 5,
  },
  modalVideoStyle: {
    width: '100%',
    height: 'auto',
  }
};

const ProjectCard = (props) => {
  const theme = useContext(ThemeContext);
  const parseBodyText = (text) => <ReactMarkdown children={text} />;

  const { project } = props;
  
  // State to manage modal visibility
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleVideoModalOpen = () => setShowVideoModal(true);
  const handleVideoModalClose = () => setShowVideoModal(false);

  return (
    <Col>
      <Card
        style={{
          ...styles.cardStyle,
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
        }}
        text={theme.bsSecondaryVariant}
      >
        <Card.Img variant="top" src={project?.image} />
        <Card.Body>
          <Card.Title style={styles.cardTitleStyle}>{project.title}</Card.Title>
          <Card.Text style={styles.cardTextStyle}>
            {parseBodyText(project.bodyText)}
          </Card.Text>
        </Card.Body>

        <Card.Body>
          {project?.links?.map((link) => (
            link.text === 'Video Demo' ? (
              <Button
                key={link.href}
                style={styles.buttonStyle}
                variant={'outline-' + theme.bsSecondaryVariant}
                onClick={handleVideoModalOpen}  // Show modal for Video Demo
              >
                {link.text}
              </Button>
            ) : (
              <Button
                key={link.href}
                style={styles.buttonStyle}
                variant={'outline-' + theme.bsSecondaryVariant}
                onClick={() => window.open(link.href, '_blank')}  // Open external link for others
              >
                {link.text}
              </Button>
            )
          ))}
        </Card.Body>
        
        {project.tags && (
          <Card.Footer style={{ backgroundColor: theme.cardFooterBackground }}>
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                pill
                bg={theme.bsSecondaryVariant}
                text={theme.bsPrimaryVariant}
                style={styles.badgeStyle}
              >
                {tag}
              </Badge>
            ))}
          </Card.Footer>
        )}

        {/* Modal for Video Demo */}
        <Modal show={showVideoModal} onHide={handleVideoModalClose} size="xl" centered>
          <Modal.Header closeButton>
            <Modal.Title>{project.title} - Video Demo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ textAlign: 'center' }}>
              <video
                controls
                style={styles.modalVideoStyle}
                src={project.liveDemoVideoSrc}  // Video URL from the project data
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </Modal.Body>
        </Modal>
      </Card>
    </Col>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
    liveDemoVideoSrc: PropTypes.string, // Add this new property to handle video src
  }).isRequired,
};

export default ProjectCard;
