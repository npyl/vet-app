import Grid from "@mui/material/Grid";
import Image from "next/image";
import { GridItem } from "./styled";

import Cat from "../../../public/images/hero/cat.png";
import Cat2 from "../../../public/images/hero/cat2.png";
import Dog from "../../../public/images/hero/dog.png";
import Munchkin from "../../../public/images/hero/munchkin.png";
import Paw from "../../../public/images/hero/paw.png";
import Mouse from "../../../public/images/hero/mouse.png";

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
