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
    NativeSelect,
    Paper,
    TextField,
} from '@mui/material';

const ShowProblem = () => {
    const [loader, setLoader] = useState(false);
    const { token, isLoggedIn } = useContext(UserContext);
    const { problemSlug } = useParams();
    const [problem, setProblem] = useState({});
    const [lang, setLang] = useState('c_cpp');
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    const handleLangSwitch = (event) => {
        setLang(event.target.value);
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
            }
            setLoader(false);
        } catch (error) {
            console.log(error.response.data.stderr);
            setLoader(false);
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
            }
            setLoader(false);
        } catch (error) {
            console.log(error.response.data.stderr);
            setLoader(false);
        }
    };

    return (
        <Box>
            <div className="outer-container" marginTop={100}>
                <h1 className="problem-heading">{problem.title}</h1>
                <div className="chip-container">
                    <div className="chip-content">{problem.difficulty}</div>
                </div>
                <div className="problem-paragraph">
                    <p>{problem.description}</p>
                    <br />

                    <p>You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>
                    <br />

                    <p>You can return the answer in any order.</p>

                    <div>
                        {problem.examples && problem.examples.length > 0 ? (
                            problem.examples.map((example, index) => (
                                <div key={index} className="example">
                                    <p className="example-heading">Example {index + 1}:</p>
                                    <div className="example-content">
                                        <div>
                                            <span className="example-heading">Input: </span>
                                            <p className="example-p">{example.input}</p>
                                        </div>
                                        <div>
                                            <span className="example-heading">Output: </span>
                                            <p className="example-p">{example.output}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Loading examples...</p>
                        )}

                        <div className="constrain-container">
                            <p className="constrain-p">Constraints:</p>
                            {problem && problem.constraints && (
                                <ul className='example-content'>
                                    {problem.constraints.split('<br>').map((constraint, index) => (
                                       <li key={index}>{constraint}</li>
                                    ))}
                                </ul>
                            )}

                        </div>
                        <div className="constrain-container">
                            <p className="constrain-p">Input pattern</p>
                            
                                <ul className='example-content'>
                                   
                                       <li > t \\number of test cases</li>
                                        <li > n \\ dimensions of input data structure</li>
                                        <li > a[i] \\ input data structure</li>
                                        <li> \\ another relevant argument for the problem</li>
                                   
                                </ul>

                        </div>
                    </div>
                </div>
            </div>
            <Box sx={{ width: '50%', position: 'fixed', right: '0', top: '100px' }}>
                <Box>
                    <Box sx={{ minWidth: 50 }}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Lang
                            </InputLabel>
                            <NativeSelect
                                defaultValue="c_cpp"
                                inputProps={{
                                    name: 'lang',
                                    id: 'uncontrolled-native',
                                }}
                                onChange={handleLangSwitch}
                            >
                                <option value="c_cpp">C++</option>
                                <option value="java">Java</option>
                                <option value="python">Python</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>
                </Box>
                <Editor lang={lang} setCode={setCode} />
                <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
                    <Box>
                        <Paper>
                            <TextField
                                id="outlined-multiline-static"
                                label="Input"
                                multiline
                                fullWidth
                                rows={5}
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value);
                                }}
                            />
                        </Paper>
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ display: 'block', mt: 1 }}
                            onClick={handleRun}
                        >
                            Run Code
                        </Button>
                    </Box>
                    <Box>
                        <Paper>
                            <TextField
                                id="outlined-multiline-static"
                                label="Output"
                                multiline
                                fullWidth
                                rows={5}
                                value={output}
                            />
                        </Paper>
                    </Box>
                    <Box sx={{ ml: 'auto', mr: 3 }}>
                        <Button variant="contained" color="success" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Box>
                </Box>
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
