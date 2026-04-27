import { useState } from 'react';


interface Document {
  id: string;
  document_type: string;
  file_name: string;
  expiry_date: string | null;
  uploaded_by: string;
  created_at: string;
}

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showUpload, setShowUpload] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div />
        <button onClick={() => setShowUpload(!showUpload)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload Document
        </button>
      </div>

      {showUpload && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
          <p className="text-sm text-gray-400">PDF, DOC, JPG up to 10MB</p>
        </div>
      )}

      {documents.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Documents Yet</h3>
          <p className="text-gray-500 mb-6">Upload your compliance documents to keep them organized</p>
          <button onClick={() => setShowUpload(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">
            Upload Your First Document
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">{doc.document_type}</span>
                  <h3 className="font-semibold text-gray-900 mt-2">{doc.file_name}</h3>
                  <div className="mt-2 space-y-1 text-sm text-gray-500">
                    <p>Uploaded by: {doc.uploaded_by}</p>
                    <p>Date: {doc.created_at}</p>
                    {doc.expiry_date && <p>Expires: {doc.expiry_date}</p>}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100">Download</button>
                <button className="flex-1 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">View</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}