

export default function Leave() {
  return (
    
      <div className="px-6 py-6 space-y-8">

        {/* HEADER + MONTH FILTER */}
        

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Casual Leave", value: "2 Days", color: "text-indigo-600" },
            { title: "Sick Leave", value: "1 Day", color: "text-emerald-600" },
            { title: "Total Used", value: "3 Days", color: "text-amber-600" },
          ].map((card, i) => (
            <div
              key={i}
              className="
                bg-white rounded-3xl p-6 border
                shadow-sm hover:shadow-xl
                hover:-translate-y-1
                transition-all
              "
            >
              <p className="text-sm text-slate-500">{card.title}</p>
              <h3 className={`text-3xl font-semibold mt-2 ${card.color}`}>
                {card.value}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Selected month
              </p>
            </div>
          ))}
        </div>

        {/* APPLY LEAVE CARD */}
        <div
          className="
            bg-white rounded-3xl p-8 border
            shadow-sm hover:shadow-2xl
            hover:-translate-y-1
            transition-all
          "
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Apply New Leave
            </h3>
            <p className="text-sm text-slate-500">
              Fill the details to submit your leave request
            </p>
          </div>

          <div className="space-y-6">

            {/* DATE RANGE */}
            <div>
              <label className="text-sm font-medium text-slate-600">
                Leave Duration
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <input
                  type="date"
                  className="px-4 py-2 rounded-xl border bg-slate-50
                             focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="date"
                  className="px-4 py-2 rounded-xl border bg-slate-50
                             focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* TYPE + HALF DAY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-slate-600">
                  Leave Type
                </label>
                <select
                  className="w-full mt-2 px-4 py-2 rounded-xl border bg-slate-50"
                >
                  <option>Casual Leave</option>
                  <option>Sick Leave</option>
                  <option>Paid Leave</option>
                  <option>Unpaid Leave</option>
                  <option>Work From Home</option>
                </select>
              </div>

              <div className="flex items-center gap-3 mt-7">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-indigo-600"
                />
                <span className="text-sm text-slate-700">
                  Apply as Half Day
                </span>
              </div>
            </div>

            {/* CONTACT + ATTACHMENT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-slate-600">
                  Contact During Leave
                </label>
                <input
                  type="text"
                  placeholder="Phone number or email"
                  className="w-full mt-2 px-4 py-2 rounded-xl border
                             bg-slate-50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">
                  Attachment
                </label>
                <input
                  type="file"
                  className="
                    w-full mt-2 text-sm
                    file:mr-4 file:px-4 file:py-2
                    file:rounded-xl file:border-0
                    file:bg-indigo-50 file:text-indigo-600
                    hover:file:bg-indigo-100
                    transition
                  "
                />
              </div>
            </div>

            {/* REASON */}
            <div>
              <label className="text-sm font-medium text-slate-600">
                Reason
              </label>
              <textarea
                rows={4}
                placeholder="Explain your reason"
                className="w-full mt-2 px-4 py-2 rounded-xl border
                           bg-slate-50 resize-none"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                className="px-5 py-2 rounded-xl border
                           hover:bg-slate-100 transition"
              >
                Cancel
              </button>

              <button
                className="
                  px-6 py-2 rounded-xl
                  bg-indigo-600 text-white font-medium
                  hover:bg-indigo-700
                  hover:shadow-lg
                  transition-all
                "
              >
                Submit Leave
              </button>
            </div>

          </div>
        </div>

      </div>
    
  );
}
