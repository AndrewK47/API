const getInvoiceInformation = (xmlDocument) => {
    const returnable = [];

    const idElement = xmlDocument.getElementsByTagName("cbc:ID")[0];
    const issueDateElement = xmlDocument.getElementsByTagName("cbc:IssueDate")[0];

    const id = idElement ? idElement.textContent : null;
    const issueDate = issueDateElement? issueDateElement.textContent : null;

    returnable.push({
        ID: id,
        IssueDate: issueDate,
    });

    return JSON.stringify(returnable);
}

module.exports = {
    getInvoiceInformation,
};
