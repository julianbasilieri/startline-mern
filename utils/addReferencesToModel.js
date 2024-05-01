async function addReferencesToModel(model, modelId, referenceField, referenceId) {
    const document = await model.findById(modelId);
    document[referenceField].push(referenceId);
    await document.save();
}

module.exports = addReferencesToModel