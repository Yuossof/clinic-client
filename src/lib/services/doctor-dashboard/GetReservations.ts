import axios from "axios";
import GetToken from "../auth/GetToken";

export const GetReservations = async () => {
    const token = await GetToken()
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors/reservations`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res.data.data.weakly_reservations)
       return res.data.data.weakly_reservations
    } catch (error) {
        console.error("Error fetching data!", error);

}}