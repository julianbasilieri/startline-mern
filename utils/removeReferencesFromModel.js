async function removeReferencesFromModel(model, referenceField, referenceId) {
    await model.updateMany(
        { [referenceField]: referenceId },
        { $pull: { [referenceField]: referenceId } }
    );
}

module.exports = removeReferencesFromModel