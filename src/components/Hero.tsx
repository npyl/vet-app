import Grid from "@mui/material/Grid";
import Image from "next/image";
import { GridItem } from "../app/(auth)/styled";

const Cat = "/images/hero/cat.png";
const Cat2 = "/images/hero/cat2.png";
const Dog = "/images/hero/dog.png";
const Munchkin = "/images/hero/munchkin.png";
const Paw = "/images/hero/paw.png";
const Mouse = "/images/hero/mouse.png";

const IMGS = [Cat, Dog, Cat2, Munchkin, Paw, Mouse];
const IMGS2 = [Dog, Cat, Munchkin, Cat2, Mouse, Paw];

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
