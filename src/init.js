var ba = null;

export default ({ scb, onReadyCb }) => {
    if (window !== undefined && window?.Dapi) {
        return window.Dapi.create({
            environment: window.Dapi.environments.sandbox, //or .production
            appKey: "5bb74a301f4f57a8d14b614a3c564e41db831dc309445a21f348124cb92baeb2",
            countries: ["AE"],
            bundleID: "test-dapi", // bundleID you set on Dashboard
            clientUserID: "CLIENT_USER_ID",
            isCachedEnabled: true,
            isExperimental: false,
            clientHeaders: {},
            clientBody: {},
            onSuccessfulLogin: function (bankAccount) {
                scb(bankAccount);
                ba = bankAccount;
                console.log({ ba });
                ba.data.getAccounts()
                    .then(payload => {
                        console.log({ payload })

                        ba.showAccountsModal(
                            "Your message to the user",
                            payload.accounts,
                            (account) => {
                                console.log(account)
                            },
                            () => {
                                console.log("User Cancelled")
                            })
                    })
            },
            onFailedLogin: function (err) {
                if (err != null) {
                    console.log("Error");
                    console.log(err);
                } else {
                    console.log("No error");
                }
            },
            onReady: () => {
                if (onReadyCb) {
                    onReadyCb();
                }
            },
            onExit: function () {
                console.log("User exited the flow")
            },
            onAuthModalOpen: function () {
                console.log("MFA modal opened")
            },
            onAuthModalSubmit: function () {
                console.log("MFA answer submitted")
            }
        });
    }
}