import { Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import useDashboard from "../../hooks/useDashboard";

const Dashboard = () => {
  const { dashboard, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  const cards = [
    {
      title: "Total Books",
      value: dashboard?.totalBooks ?? 0,
      color: "primary",
    },
    {
      title: "Students",
      value: dashboard?.totalMembers ?? 0,
      color: "success",
    },
    {
      title: "Borrowed Books",
      value: dashboard?.borrowedBooks ?? 0,
      color: "warning",
    },
    {
      title: "Available Books",
      value: dashboard?.availableBooks ?? 0,
      color: "info",
    },
  ];

  return (
    <div className="container-fluid">

      <div className="mb-4">
        <h2 className="fw-bold">Dashboard</h2>
        <p className="text-muted">
          Welcome to the Student Library Management System.
        </p>
      </div>

      <Row className="g-4">
        {cards.map((card) => (
          <Col md={6} lg={3} key={card.title}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="text-center">
                <h6 className="text-muted">{card.title}</h6>

                <h2 className={`fw-bold text-${card.color}`}>
                  {card.value}
                </h2>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

    </div>
  );
};

export default Dashboard;