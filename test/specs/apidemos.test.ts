import { APIDemosActions } from "../actions/apidemos.actions";

const apiDemosAction = new APIDemosActions();

describe("ApiDemos", async () => {
    it("Hello APIDemos", async () => {
        await apiDemosAction.waitForAppBtn();
        await apiDemosAction.clickAppBtn();
        await apiDemosAction.ClickSearchBtn();
        await apiDemosAction.ClickInvokeSearchBtn();
        await apiDemosAction.fillQueryField("Hello");
        await apiDemosAction.fillAppDataField("Hello");

        expect(await apiDemosAction.getQueryFieldValue()).toEqual("Hello");
        expect(await apiDemosAction.getAppDataFieldValue()).toEqual("Hello");
    });

        it.only("Input Text to Entry Dialog", async () => {
        await apiDemosAction.waitForAppBtn();
        await apiDemosAction.clickAppBtn();
        await apiDemosAction.ClickAlertDialoghBtn();
        await apiDemosAction.ClickTexttoEntryDialogBtn();
        await apiDemosAction.FillUsernameField("Kenindra");
        await apiDemosAction.FillPasswordField("Password");

        expect(await apiDemosAction.GetUsernameValue()).toEqual("Kenindra");
        const passwordValue = await apiDemosAction.GetPasswordValue();
        expect(passwordValue.length).toBe("Password".length);
    });
});