import React, { useState } from "react";

import SearchFile from "components/SearchFile";

const DocumentPage = () => {
   const [searchDocument, setSearchDocument] = useState("");
   return (
      <div className="mt-3 px-3 xl:px-0">
         <div className="text-xl font-medium">Documents</div>
         <div className="mt-3">
            <SearchFile
               name="searchDocument"
               value={searchDocument}
               handleChange={(e) => setSearchDocument(e.target.value)}
               handleClear={() => setSearchDocument("")}
            />
         </div>
      </div>
   );
};

export default DocumentPage;
