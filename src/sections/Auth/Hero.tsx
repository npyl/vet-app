import Grid from "@mui/material/Grid";
import Image from "next/image";
import { GridItem } from "./styled";

const IMGS = [
    "/images/hero/cat.png",
    "/images/hero/dog.png",
    "/images/hero/cat2.png",
    "/images/hero/munchkin.png",
    "/images/hero/paw.png",
    "/images/hero/mouse.png",
];

const IMGS2 = [
    "/images/hero/dog.png",
    "/images/hero/cat.png",
    "/images/hero/munchkin.png",
    "/images/hero/cat2.png",
    "/images/hero/mouse.png",
    "/images/hero/paw.png",
];

const Hero = () => (
    <Grid container position="absolute" width={1} height={1}>
        {IMGS.map((_, i) => (
            <GridItem item xs={6} key={i}>
                <Image
                    alt="img"
                    src={IMGS[i]}
                    width={60}
                    height={60}
                    style={{
                        marginBottom: "50px",
                    }}
                />
                <Image
                    alt="img"
                    src={IMGS2[i]}
                    width={50}
                    height={50}
                    style={{
                        marginTop: "50px",
                    }}
                />
            </GridItem>
        ))}
    </Grid>
);

export default Hero;
