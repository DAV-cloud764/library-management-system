import { Card } from "react-bootstrap";

const DashboardCard = ({
    title,
    value,
    bg = "primary"
}) => {

    return (

        <Card
            bg={bg}
            text="white"
            className="shadow-sm h-100"
        >

            <Card.Body>

                <Card.Title>
                    {title}
                </Card.Title>

                <h2 className="fw-bold">

                    {value}

                </h2>

            </Card.Body>

        </Card>

    );

};

export default DashboardCard;