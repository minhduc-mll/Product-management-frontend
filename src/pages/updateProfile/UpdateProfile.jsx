import "./updateProfile.scss";
import UserDetail from "components/userDetail/UserDetail";
import FormUpdate from "components/formUpdate/FormUpdate";
import FormPassword from "components/formPassword/FormPassword";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "utils/apiAxios";
import { getCurrentUser } from "utils/auth";

const profileInputs = [
    {
        id: 1,
        name: "name",
        type: "text",
        label: "Name",
        placeholder: "Name",
    },
    {
        id: 2,
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Email",
    },
    {
        id: 3,
        name: "phone",
        type: "text",
        label: "Phone",
        placeholder: "Phone",
    },
    {
        id: 4,
        name: "birthday",
        type: "date",
        label: "Birthday",
    },
];

const passwordInputs = [
    {
        id: 1,
        name: "oldPassword",
        type: "password",
        label: "Current Password",
    },
    {
        id: 2,
        name: "newPassword",
        type: "password",
        label: "New Password",
    },
    {
        id: 3,
        name: "rePassword",
        type: "password",
        label: "Enter New Password",
    },
];

const UpdateProfile = () => {
    const username = getCurrentUser()?.username;

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: [`profile`, username],
        queryFn: async () => {
            const res = await apiRequest.get(`/users/profile/${username}`);
            return res.data;
        },
        enabled: !!username,
    });

    useEffect(() => {
        refetch();
    }, [username, refetch]);

    return (
        <div className="updateProfile">
            <div className="top">
                <h1 className="title">Edit User</h1>
            </div>
            {isLoading ? (
                "Loading..."
            ) : error ? (
                error.response.data.message
            ) : (
                <div className="bottom">
                    <div className="left">
                        <UserDetail user={data} />
                    </div>
                    <div className="right">
                        <FormUpdate
                            route="users"
                            inputs={profileInputs}
                            user={data}
                        />
                        <FormPassword
                            route="users"
                            inputs={passwordInputs}
                            obj={data}
                            id={data._id}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateProfile;
