import { useCallback, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import top from "../../assets/top.png";
import { IOption } from "../../types";
import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { red } from '@mui/material/colors';

const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        minWidth: 200,
    },
  });

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    width: 150,
    fontSize: 12,
    marginTop: 20,
    '&:hover': {
      backgroundColor: red[700],
    },
  }));

const Home = () => {
    const baseWords: IOption<string>[] = [];
    const [wordIndex, setWordIndex] = useState(-1);
    const [diff, setDiff] = useState(0);
    const [check, setCheck] = useState("");
    const [words, setWords] = useState<IOption<string>[]>([]);

    const GET_WORDS = gql`
        query {
            allWords {
                nodes {
                    id
                    text
                }
            }
        }
    `;

    const { loading, error } = useQuery(GET_WORDS, { 
        onCompleted: (res) => {
            const _words: IOption<string>[] = res.allWords?.nodes.map((node: { text: string; id: number; }) => ({ label: node.text, value: node.text, matched: false }));
            setWords(_words);
        }
    });

    if (loading) {
    } else if (error) {
        console.log("errr", error);
    }
    // else {
    //     data?.allWords?.nodes.map((node: { text: string; id: number; }) => {
    //         baseWords.push({ label: node.text, value: node.text, matched: false })
    //     });
    //     // setWords(baseWords);
    // }

    const getDifference = (a: string, b: string): string => {
        let i = 0, j = 0;
        var result = "";

        while (j < b.length) {
            if (a[i] != b[j] || i == a.length)
                result += b[j];
            else
                i++;
            j++;
        }
        return result;
    }

    const onStart = () => {
        if (words.length <= 0) {
            return;
        }
        if (wordIndex === -1) {
            return;
        }
        if (diff == 0) {
            return;
        }
        if (check === "") {
            return;
        }

        let word = words[wordIndex];
        console.log("onStart***", word, diff, check);
        let matched = false;
        if (word.label === check) {
            matched = true;
            alert("Identical!");
        } else {
            let result = getDifference(word.label, check);
            if (result.length <= diff) {
                matched = true;
                alert("Loosely Matched!");
            }
        }
        if (!matched) {
            alert("No match!");
        } else {
            const _words = [...words]
            _words[wordIndex].matched = matched
            setWords(_words);
            // setKey(new Date().getTime())
        }
        console.log(words);
    };

    return (
        <div>
            <Box sx={{
                p: 2,
                height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundImage: `url(${top})`,
                backgroundSize: 'cover'
            }}>

                <Typography sx={{
                    margin: '20px 0',
                    fontSize: 60,
                    fontWeight: 900,
                    color: 'white',
                }}>
                    Spell Checker 101
                </Typography>

            </Box >
            <Container maxWidth='lg'>
                <Typography sx={{
                    margin: '20px 0',
                    fontSize: 22,
                    color: red[500],
                }}>
                    Spell Check Constraints
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Grid container direction={'row'} spacing={2}>
                            <Grid item >
                                <CssTextField select label="List Items" onChange={(e) => setWordIndex(parseInt(e.target.value))}>
                                    {words.map((option, index) => (
                                        <MenuItem key={option.value} value={index}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </CssTextField>
                            </Grid>
                            <Grid item >
                                <TextField variant="outlined" label="Offset Diff Value(max match)" type="number" onChange={(e) => setDiff(parseInt(e.target.value))} />
                            </Grid>
                            <Grid item >
                                <TextField label="Value To Check" onChange={(e) => setCheck(e.target.value)} />
                            </Grid>
                        </Grid>

                        <ColorButton variant="contained" onClick={onStart}>Start</ColorButton>

                    </Grid>
                    <Grid item xs={4}>
                        <div>
                            <Typography sx={{
                                fontSize: 20,
                            }}>
                                All List Items
                            </Typography>
                            <ul>
                                {words.map((item, index) => <li key={`${index}`} style={{ textDecoration: item.matched ? 'line-through' : 'unset'}}>{item.label}</li>)}
                            </ul>
                        </div>
                    </Grid>
                </Grid>

            </Container >
        </div>
    )
}

export default Home;