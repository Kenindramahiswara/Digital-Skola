import fetch from "node-fetch";
import { expect } from "chai";
import Ajv from "ajv";
import { schema_GetUser, schema_NewUser, schema_UpdateUser } from "../schema/reqresSchema.js";

describe("API Test Suites", function() {
    const baseURL = "https://reqres.in";
    
    it("READ - Get Single User", async function () {
        const response = await fetch(`${baseURL}/api/users?per_page=12`,{
        method: "GET",
            headers: {
                "per_page" : "12",
                "x-api-key": "reqres_46ac9cfd946346a9a3589b8d3fb6f56e"
            }},
        );
        const ajv = new Ajv(); 
        const data = await response.json();
        const hasilCompile = ajv.compile(schema_GetUser);
        const hasilAkhir  = hasilCompile(data);

        expect(hasilAkhir, 'Schema tidak sesuai').to.be.true;
        expect(response.status, 'Status code tidak sesuai').to.equal(200);
    });

    it("CREATE - Create New User",async function(){
        const newPost = {
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        };

        const response = await fetch (`${baseURL}/api/register`, {
        method: "POST",
            headers: {
                "content-type": "application/json",
                "x-api-key": "reqres_46ac9cfd946346a9a3589b8d3fb6f56e"
            },
            body: JSON.stringify(newPost),
        });
            const ajv = new Ajv();
            const data = await response.json();
            const hasilCompile = ajv.compile(schema_NewUser);
            const hasilAkhir  = hasilCompile(data);

            expect(hasilAkhir, 'Schema tidak sesuai').to.be.true;
            expect(response.status, 'Status code tidak sesuai').to.equal(200);
    });

    it("PUT - Update User",async function(){
        const newPut = {
                "name": "Kenindra",
                "job": "President"
        };

        const response = await fetch (`${baseURL}/api/users/2`, {
        method: "PUT",
            headers: {
                "content-type": "application/json",
                "x-api-key": "reqres_46ac9cfd946346a9a3589b8d3fb6f56e"
            },
            body: JSON.stringify(newPut),
        });
            const ajv = new Ajv();
            const data = await response.json();
            const hasilCompile = ajv.compile(schema_UpdateUser);
            const hasilAkhir  = hasilCompile(data);

            expect(hasilAkhir, 'Schema tidak sesuai').to.be.true;
            expect(response.status, 'Status code tidak sesuai').to.equal(200);
    });

    it("DELETE - Delete User",async function(){
        const response = await fetch (`${baseURL}/api/users/2`, {
        method: "DELETE",
            headers: {
                "content-type": "application/json",
                "x-api-key": "reqres_46ac9cfd946346a9a3589b8d3fb6f56e"
            },
        });
            expect(response.status, 'Gagal menghapus user').to.equal(204);
            expect(response.status, 'Status code tidak sesuai').to.equal(204);

    });
});
