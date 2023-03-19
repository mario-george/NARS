import { header2 } from "./header2";
import Cookies from "js-cookie";
import Link from "next/link";

const { useState } = require("react");
function HeaderElement({ id, name, createdAt,cookies }) {
    // Call your Hook here
    async function get_id(e,cookies) {
        try {
            const resp = await fetch(`${process.env.url}api/v1/courses/created-courses/${e}`, {
                headers: {
                    Authorization: "Bearer " + cookies.token,
                },
            });

            const dt = await resp.json();
            Cookies.set('original_id', dt.data.course._id);
            //console.log(dt.data.course);
        } catch (e) {
            console.log(e);
        }
    };
    const handel_set_cookies = (e,cookies) => {
        get_id(e,cookies);
        Cookies.set("instance_id", e);
        
    }
    return header2(<Link href={`/instructor/courses/${id}/courseSpecs/part1`} onClick={handel_set_cookies(id,cookies)}>{name}<br></br>{createdAt}</Link>, []);
}
export default HeaderElement