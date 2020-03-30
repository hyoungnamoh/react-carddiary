import React from "react";
import {Paper} from "@material-ui/core";
import {LOAD_USER_REQUEST} from "../reducers/user";
import { useRouter } from "next/router";
import {useSelector} from "react-redux";

const WritePage = () => {
    // const { loginUser } = useSelector(state => state.user);
    // const router = useRouter();
    // if(!loginUser){
    //     router.push("/");
    // }
    return(
        <div>
            <Paper variant="outlined">
                <div>
                    asdasdsa
                </div>
            </Paper>
        </div>
    )
}

WritePage.getInitialProps = async (context) => {
    const state = context.store.getState();

    console.log("stateee" , state);

}

export default WritePage;