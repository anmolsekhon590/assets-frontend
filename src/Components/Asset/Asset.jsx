import trash from "./delete.svg";
import pencil from "./lead-pencil.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export default function Asset(props) {
    // filtering props and storing them in assets
    const asset = props.props;
    // as there are only 2 types of assets, hardcoding them in an array
    const assetType = ["Software", "Hardware"];
    // a variable to control the visibility of edit asset info menu
    const [editMenuVisible, setEditMenuVisible] = useState("hidden");
    // a variable to determine the visibility of the whole Asset component
    const [cardVisible, setCardVisible] = useState("block");
    // react-hook-form library
    const { register, handleSubmit } = useForm();

    // a function that will handle delete operations and calls
    // the api to complete that operation
    function deleteAsset() {

        axios({
            method: 'delete',
            url: `http://127.0.0.1:8080/v1/asset/${asset.assetId}`,
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("jwtToken")}`
            },
            data: {}
        }).then(res => {
            // Hides the deleted 'Asset' component from UI 
            setCardVisible("hidden");
            console.log(res);
        }).catch(res => {
            console.log("An Error Occurred!");
            console.log(res);
        })
    }

    // a function to handle edit icon click
    function editAsset() {
        // if edit menu is not visible, toggle to view it
        // else hide it if its already open
        if (editMenuVisible !== "block") {
            setEditMenuVisible("block");
        } else {
            setEditMenuVisible("hidden");
        }

    }

    // Event handler for cancel button press
    function handleCancelBtn() {
        setEditMenuVisible("hidden");
    }

    // Logic on what happens when user presses 'save changes' button
    // while updating an asset's info
    const onEditSubmit = (e) => {
        axios(`http://localhost:8080/v1/asset/${asset.assetId}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("jwtToken")}`
            },
            params: {
                'name': e.name,
                'description': e.description,
                'priceValue': e.priceValue,
                'assetTypeId': e.assetTypeId
            },
            data: {}
        }).then(res => {
            // Updating UI elements
            asset.name = e.name;
            asset.description = e.description;
            asset.priceValue = e.priceValue;
            asset.assetTypeId = e.assetTypeId;

            setEditMenuVisible("hidden")
            console.log(res);
        }).catch(res => {
            console.log(res);
        })
    }


    return (
        <div className={`bg-color-2 text-color-4 rounded-lg p-4 m-3 ${cardVisible}`}>

            {/* Info Card - displays data about the asset */}
            <div>
                <p>Name: {asset.name}</p>
                <p>Description: {asset.description}</p>
                <p>Price: ${(Math.round(asset.priceValue * 100) / 100).toFixed(2)}</p>
                <p>Purchase date: {asset.purchaseDate}</p>
                <p>Asset Type: {assetType[asset.assetTypeId]}</p>
                <div className="flex">
                    <img title="Delete" alt="Delete Button" className="cursor-pointer w-8" src={trash} onClick={deleteAsset} />
                    <img title="Edit" alt="Edit Button" className="cursor-pointer w-8" src={pencil} onClick={editAsset} />
                </div>
            </div>

            {/* Edit menu - Only visible when user presses 'pencil' icon on an asset */}
            <div className={editMenuVisible + " mt-2"}>
                {/* A form to take input for changes - It will autoload existing info about the asset in fields */}
                <form className="text-black bg-white p-2 rounded-md" onSubmit={handleSubmit(onEditSubmit)}>
                    <h3 className="text-2xl text-center">Edit Menu:</h3>
                    <div className="mb-2">
                        <label htmlFor="name">Name: </label>
                        <input className="border-2 w-full rounded-md p-1" type="text" name="name" {...register("name")} defaultValue={asset.name} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="description">Description: </label>
                        <input className="border-2 w-full rounded-md p-1" type="text" name="description" {...register("description")} defaultValue={asset.description} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="price">Price: </label>
                        <input className="border-2 w-full rounded-md p-1" type="number" name="price" {...register("priceValue")} defaultValue={asset.priceValue} step="0.01" min="0.01" required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="assetType">Asset Type: </label>
                        <select className="p-1 w-full rounded-md border-2" name="assetType" {...register("assetTypeId")} defaultValue={asset.assetTypeId} >
                            <option value={0} >Software</option>
                            <option value={1} >Hardware</option>
                        </select>
                    </div>

                    {/* User will be presented with an option to either save changes or to cancel them */}
                    {/* Suitable Event Handlers are assigned to them */}
                    <div className="mt-5">
                        <button className="bg-grey p-2 rounded-md mr-5 shadow-grey shadow-md" type="button" onClick={handleCancelBtn} >Cancel</button>
                        <button className="bg-color-1 text-color-4 p-2 rounded-md shadow-color-4 shadow-md" type="submit">Save Changes</button>
                    </div>
                </form>
            </div>


        </div>
    )
}