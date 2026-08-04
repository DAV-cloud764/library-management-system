import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";

import useDashboard from "../../hooks/useDashboard";
import DashboardCard from "../../components/dashboard/DashboardCard";

const Dashboard = () => {

    const {
        dashboard,
        loading,
        error
    } = useDashboard();

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    {error}
                </Alert>
            </Container>
        );
    }

    if (!dashboard) {
        return null;
    }

    return (

        <Container className="mt-4">

            <h2 className="mb-4">
                Dashboard
            </h2>

            <Row className="g-4">

                <Col md={6} lg={3}>
                    <DashboardCard
                        title="Books"
                        value={dashboard.totalBooks}
                        bg="primary"
                    />
                </Col>

                <Col md={6} lg={3}>
                    <DashboardCard
                        title="Members"
                        value={dashboard.totalMembers}
                        bg="success"
                    />
                </Col>

                <Col md={6} lg={3}>
                    <DashboardCard
                        title="Borrowed"
                        value={dashboard.borrowedBooks}
                        bg="warning"
                    />
                </Col>

                <Col md={6} lg={3}>
                    <DashboardCard
                        title="Available"
                        value={dashboard.availableBooks}
                        bg="info"
                    />
                </Col>

            </Row>

        </Container>

    );

};

export default Dashboard;