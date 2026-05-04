import { APIDemosPage } from "../pageobjects/apidemos.page";

export class APIDemosActions {
    async waitForAppBtn() {
        await APIDemosPage.appBtn().waitForDisplayed({ timeout: 5000 });
    }

    async clickAppBtn() {
        await APIDemosPage.appBtn().click();
    }

    async verifyAppBtn() {
        return await APIDemosPage.appBtn().isDisplayed();
    }

    async ClickSearchBtn() {
        await APIDemosPage.searchBtn().click();
    }

    async ClickInvokeSearchBtn() {
        await APIDemosPage.InvokeSearchBtn().click();
    }

    async fillQueryField(query: string) {
        await APIDemosPage.prefillQueryField().setValue(query);
    }

    async fillAppDataField(query: string) {
        await APIDemosPage.appDataField().setValue(query);
    }

    async getQueryFieldValue() {
        return await APIDemosPage.prefillQueryField().getText();
    }

    async getAppDataFieldValue() {
        return await APIDemosPage.appDataField().getText();
    }

    async ClickAlertDialoghBtn() {
        await APIDemosPage.alertDialogBtn().click();
    }

    async ClickTexttoEntryDialogBtn() {
        await APIDemosPage.textEntryDialogBtn().click();
    }

    async FillUsernameField(query: string) {
        await APIDemosPage.usernameField().setValue(query);
    }

    async FillPasswordField(query: string) {
        await APIDemosPage.passwordField().setValue(query);
    }

    async GetUsernameValue() {
        return await APIDemosPage.usernameField().getText();
    }

    async GetPasswordValue() {
        return await APIDemosPage.passwordField().getText();
    }
}