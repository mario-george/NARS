export default function otp() {
    return (
        <div class="flex flex-col gap-5 justify-center items-center w-full">
        <div className="text-2xl font-bold mt-20 mb-5">  </div>
            <form
                action="/password"
                className="flex flex-col gap-10 justify-center items-center text-1xl border-none border-black shadow-2xl rounded-2xl px-7 py-4"
                method="post">
                <div className="flex flex-col gap-5">
                    <label for="text" className="font-bold mr-10">
                        Enter one time password (OTP)
                    </label>
                    <input
                        type="text"
                        id="text"
                        name="text"
                        className="button"
                        placeholder=""
                        required
                    />
                </div>
                <button type='submit' class="home-btn1 px-10 w-full ">
                    Verification
                </button>
            </form>
        </div>
    );
}