'use client';

import { useState, useEffect } from 'react';

const WithClient = ({ children }: { children: React.ReactNode }) => {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) return null;

	return <>{children}</>;
};

export default WithClient;
