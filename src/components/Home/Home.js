import React from "react";
import { Modal } from "./Modal";
import { GuestUserButton } from "./guest-user-button";
import { SignInButton } from "./SignInButton";
import { SignUpButton } from "./SignUpButton";
import { AnimatePresence, motion } from 'framer-motion'
import { variantsTitle } from "../../utils/animationVariations";
import { CLASS } from "../../utils/enums";

/**
 * A home page component.
 */

export const Home = () => {
    return (
        <div className={CLASS.home}>
            <Modal />
            <div className={CLASS.intro}>
                <AnimatePresence>
                    <motion.h1 variants={variantsTitle}
                               initial='hidden'
                               animate='visible'>hello</motion.h1>
                    <SignUpButton />
                    <SignInButton />
                    <GuestUserButton/>
                </AnimatePresence>
            </div>
        </div>
    );
}