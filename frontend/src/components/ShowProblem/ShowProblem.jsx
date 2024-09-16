import './ShowProblem.css';
import { useContext, useEffect, useState } from 'react';
import Editor from '../Editor';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Paper,
    TextField,
    Typography,
    Chip,
    Grid,
    Divider,
    useTheme,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const toastStyle = {
    fontSize: '16px',
    padding: '15px',
    lineHeight: '1.5',
    width: '400px',
    wordBreak: 'break-word',
    backgroundColor: '#333333', // Dark grey background
    color: '#ffffff', // White text for contrast,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
};

const ShowProblem = () => {
    const [loader, setLoader] = useState(false);
    const { token, isLoggedIn } = useContext(UserContext);
    const { problemSlug } = useParams();
    const [problem, setProblem] = useState({});
    const [lang, setLang] = useState('c_cpp');
    const [code, setCode] = useState(`#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    return 0;\n}`);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const theme = useTheme();

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    const handleLangSwitch = (event) => {
        setLang(event.target.value);
        switch (event.target.value) {
            case 'c_cpp':
                setCode(`#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    return 0;\n}`);
                break;
            case 'python':
                setCode(`# Python code\n\ndef main():\n    pass\n\nif __name__ == "__main__":\n    main()`);
                break;
            case 'java':
                setCode(`// Java code\n\npublic class Main {\n    public static void main(String[] args) {\n    }\n}`);
                break;
            default:
                setCode('');
        }
    };

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                setLoader(true);
                const PROBLEM_URL = `https://code-kar.onrender.com/api/problem/${problemSlug}`;
                const result = await axios.get(PROBLEM_URL, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (result.status === 200) {
                    setProblem(result.data);
                }
                setLoader(false);
            } catch (error) {
                console.log(error);
                setLoader(false);
            }
        };

        fetchProblem();
    }, [problemSlug, token]);

    const handleRun = async () => {
        try {
            setLoader(true);
            let language = lang === 'c_cpp' ? 'cpp' : lang === 'python' ? 'py' : '';

            const RUN_CODE_URL = 'https://code-kar.onrender.com/api/run';
            const result = await axios.post(
                RUN_CODE_URL,
                { lang: language, code, input },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (result.status === 200) {
                setOutput(result.data);
                toast.success('Code executed successfully',{style:toastStyle})
            }
            setLoader(false);
        } catch (error) {
            console.log(error.response?.data?.stderr);
            setLoader(false);
            toast.error(error.response?.data?.stderr||'Error occured while running code',{style:toastStyle})
        }
    };

    const handleSubmit = async () => {
        try {
            setLoader(true);
            let language = lang === 'c_cpp' ? 'cpp' : lang === 'python' ? 'py' : '';

            const SUBMIT_CODE_URL = `https://code-kar.onrender.com/api/check/${problemSlug}`;
            const result = await axios.post(
                SUBMIT_CODE_URL,
                { lang: language, code },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (result.status === 200) {
                setOutput(result.data);
                toast.success('Code submitted successfully',{style:toastStyle})
            }
            setLoader(false);
        } catch (error) {
            console.log(error.response?.data?.stderr);
            setLoader(false);
            toast.error(error.response?.data?.stderr||error.response?.data?.message||'Error occured while submitting code',{style:toastStyle })
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch(difficulty?.toLowerCase()) {
            case 'easy':
                return 'success';
            case 'medium':
                return 'warning';
            case 'hard':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', overflow: 'hidden' }}>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                newestOnTop={false}
            />
            <Box sx={{ width: '50%', overflowY: 'auto', p: 3 }}>
                <Typography variant="h4" gutterBottom>{problem.title}</Typography>
                {problem.difficulty && (
                    <Chip 
                        label={problem.difficulty} 
                        color={getDifficultyColor(problem.difficulty)}
                        sx={{ mb: 2 }} 
                    />
                )}
                <Typography variant="body1" paragraph>{problem.description}</Typography>
                
                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>Examples:</Typography>
                {problem.examples && problem.examples.length > 0 ? (
                    problem.examples.map((example, index) => (
                        <Paper key={index} elevation={3} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="subtitle1">Example {index + 1}:</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body2"><strong>Input:</strong> {example.input}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2"><strong>Output:</strong> {example.output}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))
                ) : (
                    <Typography>Loading examples...</Typography>
                )}

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>Constraints:</Typography>
                {problem && problem.constraints && (
                    <ul>
                        {problem.constraints.split('<br>').map((constraint, index) => (
                            <li key={index}><Typography variant="body2">{constraint}</Typography></li>
                        ))}
                    </ul>
                )}

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>Input Pattern:</Typography>
                <ul>
                    <li><Typography variant="body2">t - number of test cases</Typography></li>
                    <li><Typography variant="body2">n - dimensions of input data structure</Typography></li>
                    <li><Typography variant="body2">a[i] - input data structure</Typography></li>
                    <li><Typography variant="body2">Another relevant argument for the problem</Typography></li>
                </ul>
            </Box>

            <Box sx={{ width: '50%', p: 3, backgroundColor: theme.palette.background.paper }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="lang-select-label" sx={{ color: theme.palette.text.primary }}>Language</InputLabel>
                    <Select
                        labelId="lang-select-label"
                        value={lang}
                        label="Language"
                        onChange={handleLangSwitch}
                        sx={{
                            color: theme.palette.text.primary,
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.text.primary,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.text.primary,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                            },
                        }}
                    >
                        <MenuItem value="c_cpp">C++</MenuItem>
                        <MenuItem value="java">Java</MenuItem>
                        <MenuItem value="python">Python</MenuItem>
                    </Select>
                </FormControl>

                <Editor lang={lang} setCode={setCode} defaultCode={code} />

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                        <TextField
                            label="Input"
                            multiline
                            fullWidth
                            rows={5}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: theme.palette.text.primary,
                                    },
                                    '&:hover fieldset': {
                                        borderColor: theme.palette.text.primary,
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: theme.palette.primary.main,
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: theme.palette.text.primary,
                                },
                                '& .MuiInputBase-input': {
                                    color: theme.palette.text.primary,
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 1 }}
                            onClick={handleRun}
                        >
                            Run Code
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Output"
                            multiline
                            fullWidth
                            rows={5}
                            value={output}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: theme.palette.text.primary,
                                    },
                                    '&:hover fieldset': {
                                        borderColor: theme.palette.text.primary,
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: theme.palette.primary.main,
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: theme.palette.text.primary,
                                },
                                '& .MuiInputBase-input': {
                                    color: theme.palette.text.primary,
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            sx={{ mt: 1 }}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {loader && (
                <Box sx={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#55AAFF', '#55AAFF', '#55AAFF', '#55AAFF', '#55AAFF']}
                    />
                </Box>
            )}
        </Box>
    );
};

export default ShowProblem;
