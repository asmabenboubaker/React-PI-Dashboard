import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend  } from 'recharts';

import React, { useEffect, useState } from "react";

import ReactModal from 'react-modal';



import { useParams } from 'react-router-dom';


import { getPublicationById } from "./api";


import './detalis.css'



const PieChartWithCustomizedLabel = ({ isOpen, onClose, idpub }) => {

    // const { idpub } = useParams();
    const [publication, setpublication] = useState([]);




    // const PublicationDetails = async () => {
    //     const data = await getPublicationById(idpub)
    //     setpublication(data);













    useEffect(() => {


        const PublicationDetails = async () => {
            const data = await getPublicationById(idpub)
            setpublication(data);


        };
        PublicationDetails();




    }, []);



    const data = [
        { name: 'Number of Vote Up', value: publication.voteUp },
        { name: 'Number of Vote Down', value: publication.voteDown },

    ];

    const COLORS = ['#00C49F', '#FFBB28'];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = 25 + innerRadius + (outerRadius - innerRadius);
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="red" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };



    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div style={{ backgroundColor: '#0088FE', padding: '5px', border: '1px solid #ccc' }}>
                    <p style={{color : "black"}}>{`${payload[0].name} : ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };






    return (
        <>


            <ReactModal
                isOpen={isOpen}
                onRequestClose={onClose}
                // contentLabel="Ajouter un commentaire"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1000

                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        maxWidth: '600px',
                        minHeight: '450px',
                        margin: '0 auto',
                    },
                }}
            >

                <div className="row">
                    <div className="col-md-8">
                        {/* <h2 style={{marginButtom:'35px'}}>Ajouter un commentaire</h2> */}
                        <h5 style={{ marginBottom: '20px' , color : '#7b809a '}}>  Statistics By Number Of Votes
                        </h5>


                    </div>

                    <div className="col-md-2 offset-md-2" style={{ paddingLeft: "63px", paddingTop: "3px" }}>
                        <button className="comment-popup-close" onClick={onClose}>
                            <i style={{ color: "red" }} className="fa fa-times"></i>

                        </button>

                    </div>
                </div>

                <ResponsiveContainer width="100%" height={360}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>

                        <Tooltip content={<CustomTooltip />} />

                        <Legend  />

                    </PieChart>

                </ResponsiveContainer>

                {/* <p style={{ marginLeft : "80px" }}> {publication.voteUp} : Le nombre de vote up --- {publication.voteDown} :le nombre de vote down</p> */}

            </ReactModal>

        </>


    );
};

export default PieChartWithCustomizedLabel;
