import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BrandAudioPlayer from "./BrandAudioPlayer";


const tabs = [
    { id: 'editing', label: 'EDITING' },
    { id: 'proofreading', label: 'PROOFREADING' },
    { id: 'formatting', label: 'FORMATTING' },
    { id: 'typesetting', label: 'TYPESETTING & LAYOUT ADJUSTMENT' },
    { id: 'cover', label: 'COVER DESIGN' },
    { id: 'publishing', label: 'PUBLISHING' },
];

const content = {
    editing: {
        title: 'Editing',
        description: 'Editing involves improving the content, style, and accuracy of text.',
        standard: [
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
        ],
        premium: [
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
        ],
    },
    proofreading: {
        title: 'Proofreading',
        description: 'Proofreading ensures the final text is free of errors and ready for publishing.',
        standard: [
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
        ],
        premium: [
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
        ],
    },
    formatting: {
        title: 'Formatting',
        description: 'Formatting involves arranging the text in a consistent and visually appealing manner.',
        standard: [
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
        ],
        premium: [
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
        ],
    },
    typesetting: {
        title: 'Typesetting & Layout Adjustment',
        description: 'Typesetting involves setting the text on a page, including fonts and spacing.',
        standard: [
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
        ],
        premium: [
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
        ],
    },
    cover: {
        title: 'Cover Design',
        description: 'Cover design involves creating the front cover of a book or publication.',
        standard: [
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
        ],
        premium: [
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
        ],
    },
    publishing: {
        title: 'Publishing',
        description: 'Publishing involves preparing and issuing books, journals, and other material.',
        standard: [
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
        ],
        premium: [
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
            'Lorem ipsum',
        ],
    },
};

export default function BrandBundlePackages() {
    const [activeTab, setActiveTab] = useState('editing');

    const renderContent = () => {
        const activeContent = content[activeTab];
        return (
            <div className="p-8 shadow-lg brand-bundle-packages-content">
                {/* <h2 className="text-2xl mb-4">{activeContent.title}</h2> */}
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse </p>
                {/* <p className="mb-4">{activeContent.description}</p> */}
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <h3 className="text-2xl mb-2 uppercase font-poppins">Standard</h3>
                        <div className="rounded-lg">
                            <ul className="list-disc ml-5">
                                {activeContent.standard.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                            <p className="price py-3">$10,500 – $15,500</p>
                            <button className="mt-2 px-4 py-2 bg-teal-700 rounded text-white">Request a Quote</button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl mb-2 uppercase font-poppins">Premium</h3>
                        <div className="rounded-lg">
                            <ul className="list-disc ml-5">
                                {activeContent.premium.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                            <p className="price py-3">$10,500 – $15,500</p>
                            <button className="mt-2 px-4 py-2 bg-teal-700 rounded text-white">Request a Quote</button>
                        </div>
                    </div>

                </div>
            </div>
        );
    };

    return (
        <>
            <section className="container mx-auto max-w-screen-xl brand-bundle-packages-wrapper mt-12">
                <div className="flex justify-center mx-auto">
                    <div className="brand-bundle-packages-tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`font-poppins font-bold w-full text-left p-4 mb-3 text-white transition-colors duration-200 ${activeTab === tab.id ? 'active' : 'in-active hover:bg-teal-700'
                                    }`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="flex-grow px-8 pb-8 text-white">
                        {renderContent()}
                    </div>
                </div>
            </section>

        </>
    );
}