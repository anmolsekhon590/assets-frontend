import axios from "axios";
import { useEffect, useState } from "react";
import Asset from "../Asset/Asset";

export default function Assets() {

    const [assets, setAssets] = useState(null);


    useEffect(() => {
        axios("http://localhost:8080/v1/asset", {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("jwtToken")}`
            }
        })
            .then((res) => {
                setAssets(res.data)
            })
            .catch((res) => {
                console.log("An error occurred while fetching assets")
                console.log(res);
            })
    }, []);

    if (assets === null) {
        return (
            <div>
                Loading...
            </div>
        )
    } else {

        return (
            <div>
                {assets.map((element) => (
                    <Asset key={element.assetId} />
                ))};
            </div>
        )
    }
}