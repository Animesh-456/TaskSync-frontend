import React from 'react'
import { Route, Router } from 'react-router-dom'

const ProjectDetails = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-4">Project title</h1>
                <p className="text-gray-700 mb-2">
                    <strong>Description:</strong> Project Description
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Status:</strong>Status
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Created:</strong> Created
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Assigned By:</strong> Assignedby
                </p>
                {/* Render other project details as needed */}

                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">Comments</h2>
                    <ul className="bg-gray-100 p-4 rounded-lg">
                        {/* {project.comments.map((comment) => (
                            <li key={comment.id} className="mb-2">
                                <strong>{comment.author}</strong>: {comment.text}
                            </li>
                        ))} */}
                    </ul>
                </div>

                <button
                    className="bg-gray-200 text-gray-700 px-4 py-2 mt-6 rounded hover:bg-gray-300"
                    onClick={() => window.history.back()}
                >
                    Back
                </button>
            </div>
        </div>
    )
}

export default ProjectDetails