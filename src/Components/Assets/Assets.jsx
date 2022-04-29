import axios from "axios";
import { useEffect, useState } from "react";
import Asset from "../Asset/Asset";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

export default function Assets() {

    // assets stores the list of all assets 
    const [assets, setAssets] = useState(null);
    // controls the visibility of add asset form
    const [addformVisible, setAddformVisible] = useState("hidden");
    // react-hook-form library
    const { register, handleSubmit } = useForm();

    const [redirectUser, setRedirectUser] = useState(false);


    // function to handle submit button in Add Asset form
    const onAddSubmit = (e) => {
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:8080/v1/asset',
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("jwtToken")}`
            },
            data: {
                assetId: null,
                'name': e.name,
                'description': e.description,
                'priceValue': e.priceValue,
                'purchaseDate': e.purchaseDate,
                'assetTypeId': e.assetTypeId
            }
        }).then(res => {
            setAddformVisible("hidden");
            console.log(res)
        }).catch(res => {
            console.log(res)
        })
    }

    // A funtion to handle cancel button behavior
    function handleCancelBtn() {
        setAddformVisible("hidden")
    }

    //  A function to handle Add buttion click behavior 
    function handleAddBtn() {
        if (addformVisible === "hidden") {
            setAddformVisible("block");
        } else {
            setAddformVisible("hidden")
        }
    }

    function handleLogoutBtn() {
        setRedirectUser(true);
        sessionStorage.clear();
    }

    // useEffect funtion used to make API call
    useEffect(() => {
        // using axios library to make a 'GET' request 
        axios("http://localhost:8080/v1/asset", {
            method: 'GET',
            headers: {
                // Authorization token fetched from session storage
                "Authorization": `Bearer ${sessionStorage.getItem("jwtToken")}`
            }
        })
            .then((res) => {
                // if response code is 200 OK then set assets
                setAssets(res.data)
            })
            .catch((res) => {
                // if there is an error while fetching the assets
                // log the error on console
                console.log("An error occurred while fetching assets")
                console.log(res);
            })
    }, []);


    if (assets === null) {

        // if jwtToken is not set or jwtToken is empty 
        // tell the user to login again
        if (sessionStorage.getItem("jwtToken") === null || sessionStorage.getItem("jwtToken") === "") {

            return (
                <div>
                    ACCESS TOKEN INVALID: Please login again
                    <div>
                        <button onClick={handleLogoutBtn} className="m-3 bg-color-2 p-2 w-20 rounded-md text-color-4" type="button">Logout</button>
                    </div>
                </div>
            )
        }
    } else {

        return (
            <div>
                {redirectUser && < Navigate replace to="/" />}
                {/* A Button to add more Assets */}
                <button className="mt-3 ml-3 mb-3 bg-color-2 p-2 w-20 rounded-md text-color-4" type="button" onClick={handleAddBtn}>
                    Add
                </button>

                {/* A button to logout which will clear the JWT token from session storage */}
                <button className="mt-3 ml-3 mb-3 bg-color-2 p-2 w-20 rounded-md text-color-4" type="button" onClick={handleLogoutBtn}>
                    Logout
                </button>

                {/* Add Asset Form with all input fields */}
                <div className={"m-3 " + addformVisible}>

                    <form className="text-black bg-white p-2 rounded-md" onSubmit={handleSubmit(onAddSubmit)}>
                        <div className="mb-2">
                            <label htmlFor="name">Name: </label>
                            <input className="border-2 w-full rounded-md p-1" type="text"  {...register("name")} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="description">Description: </label>
                            <input className="border-2 w-full rounded-md p-1" type="text"  {...register("description")} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="price">Price: </label>
                            <input className="border-2 w-full rounded-md p-1" type="number"  {...register("priceValue")} step="0.1" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="purchaseDate">Price: </label>
                            <input className="border-2 w-full rounded-md p-1" type="date"  {...register("purchaseDate")} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="assetType">Asset Type: </label>
                            <select className="p-1 w-full rounded-md border-2"  {...register("assetTypeId")}>
                                <option value={0} >Software</option>
                                <option value={1} >Hardware</option>
                            </select>
                        </div>

                        <div className="mt-5">
                            <button className="bg-grey p-2 rounded-md mr-5 shadow-grey shadow-md" type="button" onClick={handleCancelBtn} >Cancel</button>
                            <button className="bg-color-1 text-color-4 p-2 rounded-md shadow-color-4 shadow-md" type="submit">Save Changes</button>
                        </div>
                    </form>

                </div>

                {/* Displays all assets fetched from the API */}
                <div>
                    {assets.map((element) => (
                        <Asset key={element.assetId} props={element} />
                    ))};
                </div>
            </div>
        )
    }
}