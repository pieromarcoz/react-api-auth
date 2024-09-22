const ResponseDisplay = ({response}: { response: unknown | null }) => {
    if (!response) return null;

    return (
        <div className="mt-6 w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-black text-white py-2 px-4">
                <h2 className="text-lg font-semibold">Backend Response</h2>
            </div>
            <pre className="bg-gray-100 p-4 overflow-x-auto">
                <code className="text-sm text-black whitespace-pre-wrap break-words">
                  {JSON.stringify(response, null, 2)}
                </code>
            </pre>
        </div>
    );
};

export default ResponseDisplay;