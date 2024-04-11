import React, { useEffect, useState } from 'react'
import { addUserSubject, getPaper, getProgram, getSemester } from '../services/Api';
import { useSelector } from 'react-redux';
import { MenuItem, Select } from '@mui/material';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import BackArrow from './BackArrow';

const AddUserSubjects = () => {
    const [allPapers, setAllPapers] = useState([]);
    const [allprograms, setAllprograms] = useState([]);
    const [allSemesters, setAllSemesters] = useState([]);
    const mode = useSelector((state) => state.mode.mode)
    const params = useParams();
    const { id } = params;
    const [paper, setPaper] = useState({ userId: '', paper: '', program: '', semester: '' })

    useEffect(() => {
        setPaper({
            ...paper,
            userId: id
        })
        getAllPapers();
        getAllPrograms();
        getAllSemesters();
    }, [])

    const getAllPapers = async () => {
        const response = await getPaper();
        setAllPapers(response.data.papers)
    }
    const getAllPrograms = async () => {
        const res = await getProgram();
        setAllprograms(res.data.programs)
    }
    const getAllSemesters = async () => {
        const res = await getSemester();
        setAllSemesters(res.data.semesters)
    }

    const addSubject = async () => {
        if (!paper.program) {
            toast("Please Enter Program")
            return;
        }
        if (!paper.semester) {
            toast("Please Enter Semester")
            return;
        }
        if (!paper.paper) {
            toast("Please Enter Paper")
            return;
        }

        const res = await addUserSubject({ paperId: paper.paper, userId: paper.userId });
        toast("Subject Added to " + res.data.name)
    }

    return (
        <div className='min-h-[90vh] relative flex items-center justify-center'>
            <BackArrow classes="absolute top-0 left-0" />

            <div className="w-[70vw] h-[70vh] p-4 flex flex-col items-center justify-start gap-7 shadow-2xl border border-gray-300 rounded-2xl">
                <h2 className='text-3xl font-semibold'>Add Subject to User</h2>
                <div className="w-full p-2 pt-6 gap-4 flex items-center justify-center flex-wrap">
                    <Select value={paper.program} className='md:w-[30%] w-full' name='program' onChange={(e) => setPaper({ ...paper, [e.target.name]: e.target.value })} >
                        {
                            allprograms && allprograms.map((program) => (
                                <MenuItem value={program}>{program.program}</MenuItem>
                            ))
                        }
                    </Select>
                    <Select value={paper.semester} className='md:w-[30%] w-full' name='semester' disabled={!paper.program} onChange={(e) => setPaper({ ...paper, [e.target.name]: e.target.value })} >
                        {
                            allSemesters && allSemesters.map((semester) => (
                                <MenuItem value={semester}>{semester.semester}</MenuItem>
                            ))
                        }
                    </Select>
                    <Select value={paper.paper} className='md:w-[30%] w-full' disabled={!paper.semester && !paper.program} name='paper' onChange={(e) => setPaper({ ...paper, [e.target.name]: e.target.value })} >
                        {
                            allPapers && allPapers
                                .filter((subject) => subject.semester === paper.semester._id && subject.program === paper.program._id)
                                .map((paper) => (
                                    <MenuItem value={paper._id}>{paper.newpaper}</MenuItem>
                                ))
                        }
                    </Select>
                </div>

                <div className="flex gap-5 mt-6">
                    <button className='bg-primary text-xl text-white p-2 w-40 rounded-lg' onClick={() => setPaper({ userId: '', paper: '', semester: '', program: '' })}>Reset</button>
                    <button className='bg-primary text-xl text-white p-2 w-40 rounded-lg' onClick={addSubject}>Add Subject</button>
                </div>
            </div>
        </div>
    )
}

export default AddUserSubjects