export const helpCoordinates = async (req, res) => {
    let city;
    res.status(200).json({ message: `Location coordinates for ${city} gotten successfully`})
};

export const nearbyHelp = async (req, res ) => {
    let data;
    res.status(200).json({ message: "Nearby help centers gotten" });
};