import {
    ICatBloodType,
    ICatRace,
    IDogBloodType,
    IDogRace,
    IPetType,
} from "./pet";

export const PET_TYPE_OPTIONS: { key: IPetType; value: string }[] = [
    { key: "DOG", value: "Dog" },
    { key: "CAT", value: "Cat" },
];

export const DOG_RACE_OPTIONS: { key: IDogRace; value: string }[] = [
    { key: "Kangal", value: "Kangal" },
    { key: "Maltese", value: "Maltese" },
    { key: "Pitbull", value: "Pitbull" },
    { key: "Pomeranian", value: "Pomeranian" },
    { key: "Poodle", value: "Poodle" },
    { key: "Pug", value: "Pug" },
    { key: "Rottweiler", value: "Rottweiler" },
    { key: "Schnauzer", value: "Schnauzer" },
    { key: "Shih tzu", value: "Shih tzu" },
    { key: "Siberian husky", value: "Siberian husky" },
    { key: "Whippet", value: "Whippet" },
    { key: "Yorkshire terrier", value: "Yorkshire terrier" },
];

export const CAT_RACE_OPTIONS: { key: ICatRace; value: string }[] = [
    { key: "american curl longhair", value: "American Curl Longhair" },
    { key: "balinese", value: "Balinese" },
    { key: "british longhair", value: "British Longhair" },
    { key: "Cymric", value: "Cymric" },
    { key: "Japanese Bobtail Longhair", value: "Japanese Bobtail Longhair" },
    { key: "mastiff", value: "Mastiff" },
    { key: "mastino napoletano", value: "Mastino Napoletano" },
    { key: "miniature Pinscher", value: "Miniature Pinscher" },
    { key: "Mudi", value: "Mudi" },
    { key: "persian", value: "Persian" },
];

export const DOG_BLOOD_OPTIONS: { key: IDogBloodType; value: string }[] = [
    { key: "DEA 1.1 +", value: "DEA 1.1 +" },
    { key: "DEA 1.1 -", value: "DEA 1.1 -" },
    { key: "DEA 1.2", value: "DEA 1.2" },
];

export const CAT_BLOOD_OPTIONS: { key: ICatBloodType; value: string }[] = [
    { key: "A", value: "American Curl Longhair" },
    { key: "B", value: "Balinese" },
    { key: "AB", value: "British Longhair" },
];
