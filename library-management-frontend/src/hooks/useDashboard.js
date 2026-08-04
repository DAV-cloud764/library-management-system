import { useEffect, useState } from "react";
import dashboardService from "../services/dashboardService";

const useDashboard = () => {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const loadDashboard = async () => {

        try {

            setLoading(true);

            setError("");

            const data =
                await dashboardService.getDashboard();

            setDashboard(data);

        } catch (err) {

            console.error(err);

            setError("Failed to load dashboard.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadDashboard();

    }, []);

    return {

        dashboard,
        loading,
        error,
        loadDashboard

    };

};

export default useDashboard;