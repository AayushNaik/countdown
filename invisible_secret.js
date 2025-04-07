
        // Encrypted pieces of the secret
        const encryptedPieces = [
            'U2FsdGVkX1+aB7aS1bhJA6quVWiuqEvF9DnQh7+V3Kw=',
            'U2FsdGVkX1+X3nBLEWJa3XqdBLlRSw2Fw7P9EFksFvw=',
            'U2FsdGVkX1+1gL6lOQDh1EUH6lOEpAiqTHchRhQbfwY='
        ];

        const endDate = new Date('2025-04-10T13:13:00');
        const timeKey = endDate.getTime().toString();

        function secureDecrypt(encryptedText, key) {
            try {
                const bytes = CryptoJS.AES.decrypt(encryptedText, key);
                return bytes.toString(CryptoJS.enc.Utf8);
            } catch (error) {
                console.error('Decryption failed:', error);
                return '';
            }
        }

        function revealSecret() {
            let secretCode = 'p@t13nc3_r3v34l$_@ll';
            for (let piece of encryptedPieces) {
                secretCode += secureDecrypt(piece, timeKey);
            }
            document.getElementById('secret').innerHTML = `Secret Code: ${secretCode}`;
        }

        function updateCountdown() {
            const now = new Date();
            const difference = endDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                document.getElementById('countdown').innerHTML = `
                    ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds
                `;
            } else {
                document.getElementById('countdown').innerHTML = 'Countdown finished!';
                revealSecret();
            }
        }

        setInterval(updateCountdown, 1000);
        updateCountdown();
