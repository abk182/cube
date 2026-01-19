import React from "react";

/**
 * Server stub for any module marked with `"use client"`.
 * Keeps client-only code out of the Node bundle.
 */
const UseClientServerStub: React.FC = () => 'ClientServerStub';

export default UseClientServerStub;

