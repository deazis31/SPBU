document.addEventListener('DOMContentLoaded', () => {
    // Template konfigurasi tabel untuk satu shift
    const tableTemplate = [
        { type: 'pertalite', idPrefix: 'left-top', name: 'Pertalite', headerClass: 'pertalite-header' },
        { type: 'pertamax', idPrefix: 'right-top', name: 'Pertamax', headerClass: 'pertamax-header' },
        { type: 'solar', idPrefix: 'left-bottom', name: 'Solar', headerClass: 'solar-header' },
        { type: 'dexlite', idPrefix: 'right-bottom', name: 'Dexlite', headerClass: 'dexlite-header' }
    ];

    // Fungsi untuk menghasilkan HTML untuk satu shift
    function generateShiftHTML(day, shift, baseTabIndex) {
        let html = `
            <div class="set-container set-shift${shift}">
                <h3>Shift ${shift}</h3>
                <div class="table-container">
        `;
        
        tableTemplate.forEach((table, index) => {
            const tableId = `data-table-${table.idPrefix}-shift${shift}-day${day}`;
            const totalId = `total-${table.idPrefix}-shift${shift}-day${day}`;
            const pengurangId = `pengurang-${table.idPrefix}-shift${shift}-day${day}`;
            const hasilId = `hasil-${table.idPrefix}-shift${shift}-day${day}`;
            const faktorId = `faktor-${table.idPrefix}-shift${shift}-day${day}`;
            const akhirId = `hasil-akhir-${table.idPrefix}-shift${shift}-day${day}`;

            html += `
                <div class="table-wrapper">
                    <h4 class="${table.headerClass}">${table.name}</h4>
                    <table id="${tableId}">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Nozzel 1</td><td contenteditable="true" class="nilai" tabindex="${baseTabIndex + index * 7 + 1}">0</td></tr>
                            <tr><td>Nozzel 2</td><td contenteditable="true" class="nilai" tabindex="${baseTabIndex + index * 7 + 2}">0</td></tr>
                            <tr><td>Nozzel 3</td><td contenteditable="true" class="nilai" tabindex="${baseTabIndex + index * 7 + 3}">0</td></tr>
                            <tr><td>Nozzel 4</td><td contenteditable="true" class="nilai" tabindex="${baseTabIndex + index * 7 + 4}">0</td></tr>
                            <tr><td>Nozzel 5</td><td contenteditable="true" class="nilai" tabindex="${baseTabIndex + index * 7 + 5}">0</td></tr>
                            <tr><td>Nozzel 6</td><td contenteditable="true" class="nilai" tabindex="${baseTabIndex + index * 7 + 6}">0</td></tr>
                            <tr><td>Nozzel 7</td><td contenteditable="true" class="nilai" tabindex="${baseTabIndex + index * 7 + 7}">0</td></tr>
                        </tbody>
                    </table>
                    <h2>Total ${table.name}: <span id="${totalId}">0</span></h2>
                    <div class="input-pengurang">
                        <label for="${pengurangId}">Pengurang: </label>
                        <input type="number" id="${pengurangId}" value="0" step="any">
                    </div>
                    <h2>Hasil Pengurangan: <span id="${hasilId}">0</span></h2>
                    <div class="input-perkalian">
                        <label for="${faktorId}">Faktor Perkalian: </label>
                        <input type="number" id="${faktorId}" value="1" step="any">
                    </div>
                    <h2>Hasil Akhir: <span id="${akhirId}">0</span></h2>
                </div>
            `;
        });

        html += `
                </div>
                <div class="summary-container">
                    <h2>Ringkasan Hasil Akhir</h2>
                    <table id="summary-table-shift${shift}-day${day}">
                        <thead>
                            <tr>
                                <th>Jenis Bahan Bakar</th>
                                <th>Total Hasil Akhir</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Pertalite</td><td id="summary-perlalite-shift${shift}-day${day}">0</td></tr>
                            <tr><td>Pertamax</td><td id="summary-pertamax-shift${shift}-day${day}">0</td></tr>
                            <tr><td>Solar</td><td id="summary-solar-shift${shift}-day${day}">0</td></tr>
                            <tr><td>Dexlite</td><td id="summary-dexlite-shift${shift}-day${day}">0</td></tr>
                            <tr><td>Total Semua Bahan Bakar</td><td id="total-all-shift${shift}-day${day}">0</td></tr>
                            <tr><td>DO</td><td><input type="number" id="do-value-shift${shift}-day${day}" value="0" step="any"></td></tr>
                            <tr><td>Pengeluaran</td><td><input type="number" id="pengeluaran-value-shift${shift}-day${day}" value="0" step="any"></td></tr>
                            <tr><td>Titipan</td><td><input type="number" id="titipan-value-shift${shift}-day${day}" value="0" step="any"></td></tr>
                            <tr><td>Tambahan 1</td><td><input type="number" id="tambahan1-value-shift${shift}-day${day}" value="0" step="any"></td></tr>
                            <tr><td>Tambahan 2</td><td><input type="number" id="tambahan2-value-shift${shift}-day${day}" value="0" step="any"></td></tr>
                            <tr><td>Hasil Sisa</td><td id="final-result-shift${shift}-day${day}">0</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        return html;
    }

    // Generate HTML untuk 31 hari
    const daysContainer = document.querySelector('.days-container');
    for (let day = 1; day <= 31; day++) {
        const dayHtml = `
            <div class="day-container" data-day="${day}">
                <h2>Hari ${day}</h2>
                <div class="main-container">
                    ${generateShiftHTML(day, 1, (day - 1) * 56)}
                    ${generateShiftHTML(day, 2, (day - 1) * 56 + 28)}
                </div>
            </div>
        `;
        daysContainer.insertAdjacentHTML('beforeend', dayHtml);
    }

    // Konfigurasi tabel untuk semua hari
    const allTables = [];
    for (let day = 1; day <= 31; day++) {
        allTables.push({
            day,
            shift1: [
                { id: `data-table-left-top-shift1-day${day}`, total: `total-left-top-shift1-day${day}`, pengurang: `pengurang-left-top-shift1-day${day}`, hasil: `hasil-left-top-shift1-day${day}`, faktor: `faktor-left-top-shift1-day${day}`, akhir: `hasil-akhir-left-top-shift1-day${day}`, summaryId: `summary-perlalite-shift1-day${day}`, name: 'Pertalite' },
                { id: `data-table-right-top-shift1-day${day}`, total: `total-right-top-shift1-day${day}`, pengurang: `pengurang-right-top-shift1-day${day}`, hasil: `hasil-right-top-shift1-day${day}`, faktor: `faktor-right-top-shift1-day${day}`, akhir: `hasil-akhir-right-top-shift1-day${day}`, summaryId: `summary-pertamax-shift1-day${day}`, name: 'Pertamax' },
                { id: `data-table-left-bottom-shift1-day${day}`, total: `total-left-bottom-shift1-day${day}`, pengurang: `pengurang-left-bottom-shift1-day${day}`, hasil: `hasil-left-bottom-shift1-day${day}`, faktor: `faktor-left-bottom-shift1-day${day}`, akhir: `hasil-akhir-left-bottom-shift1-day${day}`, summaryId: `summary-solar-shift1-day${day}`, name: 'Solar' },
                { id: `data-table-right-bottom-shift1-day${day}`, total: `total-right-bottom-shift1-day${day}`, pengurang: `pengurang-right-bottom-shift1-day${day}`, hasil: `hasil-right-bottom-shift1-day${day}`, faktor: `faktor-right-bottom-shift1-day${day}`, akhir: `hasil-akhir-right-bottom-shift1-day${day}`, summaryId: `summary-dexlite-shift1-day${day}`, name: 'Dexlite' }
            ],
            shift2: [
                { id: `data-table-left-top-shift2-day${day}`, total: `total-left-top-shift2-day${day}`, pengurang: `pengurang-left-top-shift2-day${day}`, hasil: `hasil-left-top-shift2-day${day}`, faktor: `faktor-left-top-shift2-day${day}`, akhir: `hasil-akhir-left-top-shift2-day${day}`, summaryId: `summary-perlalite-shift2-day${day}`, name: 'Pertalite' },
                { id: `data-table-right-top-shift2-day${day}`, total: `total-right-top-shift2-day${day}`, pengurang: `pengurang-right-top-shift2-day${day}`, hasil: `hasil-right-top-shift2-day${day}`, faktor: `faktor-right-top-shift2-day${day}`, akhir: `hasil-akhir-right-top-shift2-day${day}`, summaryId: `summary-pertamax-shift2-day${day}`, name: 'Pertamax' },
                { id: `data-table-left-bottom-shift2-day${day}`, total: `total-left-bottom-shift2-day${day}`, pengurang: `pengurang-left-bottom-shift2-day${day}`, hasil: `hasil-left-bottom-shift2-day${day}`, faktor: `faktor-left-bottom-shift2-day${day}`, akhir: `hasil-akhir-left-bottom-shift2-day${day}`, summaryId: `summary-solar-shift2-day${day}`, name: 'Solar' },
                { id: `data-table-right-bottom-shift2-day${day}`, total: `total-right-bottom-shift2-day${day}`, pengurang: `pengurang-right-bottom-shift2-day${day}`, hasil: `hasil-right-bottom-shift2-day${day}`, faktor: `faktor-right-bottom-shift2-day${day}`, akhir: `hasil-akhir-right-bottom-shift2-day${day}`, summaryId: `summary-dexlite-shift2-day${day}`, name: 'Dexlite' }
            ]
        });
    }

    // Mapping untuk menghubungkan total Shift 1 ke pengurang Shift 2 per hari
    const shift1ToShift2Mapping = [
        { totalShift1Prefix: 'total-left-top-shift1-day', pengurangShift2Prefix: 'pengurang-left-top-shift2-day' }, // Pertalite
        { totalShift1Prefix: 'total-right-top-shift1-day', pengurangShift2Prefix: 'pengurang-right-top-shift2-day' }, // Pertamax
        { totalShift1Prefix: 'total-left-bottom-shift1-day', pengurangShift2Prefix: 'pengurang-left-bottom-shift2-day' }, // Solar
        { totalShift1Prefix: 'total-right-bottom-shift1-day', pengurangShift2Prefix: 'pengurang-right-bottom-shift2-day' } // Dexlite
    ];

    // Fungsi untuk menghitung satu set tabel
    function updateSetCalculations(tables, totalAllId, doValueId, pengeluaranValueId, titipanValueId, tambahan1ValueId, tambahan2ValueId, finalResultId, isShift1 = false, day = 1) {
        let grandTotal = 0;

        tables.forEach((tableData) => {
            const table = document.getElementById(tableData.id);
            const totalElement = document.getElementById(tableData.total);
            const pengurangInput = document.getElementById(tableData.pengurang);
            const hasilPengurangElement = document.getElementById(tableData.hasil);
            const faktorInput = document.getElementById(tableData.faktor);
            const hasilAkhirElement = document.getElementById(tableData.akhir);
            const summaryElement = document.getElementById(tableData.summaryId);

            let total = 0;
            const cells = table.querySelectorAll('.nilai');

            cells.forEach(cell => {
                let value = cell.textContent.trim();
                value = value.replace(/\s/g, '').replace(/,/g, '.');
                value = parseFloat(value) || 0;
                total += value;
            });

            totalElement.textContent = total.toFixed(2);

            // Gunakan nilai pengurang dari input
            let pengurang = parseFloat(pengurangInput.value.replace(/,/g, '.')) || 0;

            const hasilPengurang = total - pengurang;
            hasilPengurangElement.textContent = hasilPengurang.toFixed(2);

            const faktor = parseFloat(faktorInput.value.replace(/,/g, '.')) || 1;
            const hasilAkhir = hasilPengurang * faktor;
            hasilAkhirElement.textContent = hasilAkhir.toFixed(2);
            summaryElement.textContent = hasilAkhir.toFixed(2);

            grandTotal += hasilAkhir;
        });

        // Update total keseluruhan
        document.getElementById(totalAllId).textContent = grandTotal.toFixed(2);

        // Hitung DO, Pengeluaran, Titipan, Tambahan 1, dan Tambahan 2
        const doValue = parseFloat(document.getElementById(doValueId).value.replace(/,/g, '.')) || 0;
        const pengeluaranValue = parseFloat(document.getElementById(pengeluaranValueId).value.replace(/,/g, '.')) || 0;
        const titipanValue = parseFloat(document.getElementById(titipanValueId).value.replace(/,/g, '.')) || 0;
        const tambahan1Value = parseFloat(document.getElementById(tambahan1ValueId).value.replace(/,/g, '.')) || 0;
        const tambahan2Value = parseFloat(document.getElementById(tambahan2ValueId).value.replace(/,/g, '.')) || 0;

        // Hitung Hasil Sisa
        const finalResult = grandTotal - doValue - pengeluaranValue - titipanValue + tambahan1Value + tambahan2Value;
        document.getElementById(finalResultId).textContent = finalResult.toFixed(2);

        // Jika ini adalah Shift 1, update pengurang Shift 2
        if (isShift1) {
            shift1ToShift2Mapping.forEach(mapping => {
                const totalShift1Id = `${mapping.totalShift1Prefix}${day}`;
                const pengurangShift2Id = `${mapping.pengurangShift2Prefix}${day}`;
                const totalShift1 = parseFloat(document.getElementById(totalShift1Id).textContent) || 0;
                const pengurangShift2Input = document.getElementById(pengurangShift2Id);
                pengurangShift2Input.value = totalShift1.toFixed(2);
            });

            // Perbarui perhitungan Shift 2 setelah pengurang diubah
            updateSetCalculations(
                allTables[day - 1].shift2,
                `total-all-shift2-day${day}`,
                `do-value-shift2-day${day}`,
                `pengeluaran-value-shift2-day${day}`,
                `titipan-value-shift2-day${day}`,
                `tambahan1-value-shift2-day${day}`,
                `tambahan2-value-shift2-day${day}`,
                `final-result-shift2-day${day}`,
                false,
                day
            );
        }
    }

    // Fungsi untuk menginisialisasi event listener untuk satu set tabel
    function initializeSet(tables, suffix, doValueId, pengeluaranValueId, titipanValueId, tambahan1ValueId, tambahan2ValueId, day, isShift1 = false) {
        tables.forEach((tableData, index) => {
            const table = document.getElementById(tableData.id);

            table.querySelectorAll('.nilai').forEach((cell, cellIndex) => {
                cell.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        const baseTabIndex = (day - 1) * 56 + (suffix === 'shift1' ? 0 : 28);
                        const nextCellIndex = cellIndex + 1;
                        const nextCell = table.querySelector(`.nilai[tabindex="${baseTabIndex + index * 7 + nextCellIndex + 1}"]`);
                        if (nextCell) {
                            nextCell.focus();
                        } else if (index < tables.length - 1) {
                            const nextTable = tables[index + 1];
                            document.getElementById(nextTable.id).querySelector('.nilai').focus();
                        } else {
                            document.getElementById(tables[0].id).querySelector('.nilai').focus();
                        }
                    }
                });

                cell.addEventListener('input', () => updateSetCalculations(tables, `total-all-${suffix}-day${day}`, `do-value-${suffix}-day${day}`, `pengeluaran-value-${suffix}-day${day}`, `titipan-value-${suffix}-day${day}`, `tambahan1-value-${suffix}-day${day}`, `tambahan2-value-${suffix}-day${day}`, `final-result-${suffix}-day${day}`, isShift1, day));
            });

            document.getElementById(tableData.pengurang).addEventListener('input', () => updateSetCalculations(tables, `total-all-${suffix}-day${day}`, `do-value-${suffix}-day${day}`, `pengeluaran-value-${suffix}-day${day}`, `titipan-value-${suffix}-day${day}`, `tambahan1-value-${suffix}-day${day}`, `tambahan2-value-${suffix}-day${day}`, `final-result-${suffix}-day${day}`, isShift1, day));
            document.getElementById(tableData.faktor).addEventListener('input', () => updateSetCalculations(tables, `total-all-${suffix}-day${day}`, `do-value-${suffix}-day${day}`, `pengeluaran-value-${suffix}-day${day}`, `titipan-value-${suffix}-day${day}`, `tambahan1-value-${suffix}-day${day}`, `tambahan2-value-${suffix}-day${day}`, `final-result-${suffix}-day${day}`, isShift1, day));
        });

        // Event listener untuk input DO, Pengeluaran, Titipan, Tambahan 1, dan Tambahan 2
        [doValueId, pengeluaranValueId, titipanValueId, tambahan1ValueId, tambahan2ValueId].forEach(id => {
            document.getElementById(id).addEventListener('input', () => updateSetCalculations(tables, `total-all-${suffix}-day${day}`, `do-value-${suffix}-day${day}`, `pengeluaran-value-${suffix}-day${day}`, `titipan-value-${suffix}-day${day}`, `tambahan1-value-${suffix}-day${day}`, `tambahan2-value-${suffix}-day${day}`, `final-result-${suffix}-day${day}`, isShift1, day));
        });
    }

    // Inisialisasi semua hari
    allTables.forEach(({ day, shift1, shift2 }) => {
        initializeSet(shift1, 'shift1', `do-value-shift1-day${day}`, `pengeluaran-value-shift1-day${day}`, `titipan-value-shift1-day${day}`, `tambahan1-value-shift1-day${day}`, `tambahan2-value-shift1-day${day}`, day, true);
        initializeSet(shift2, 'shift2', `do-value-shift2-day${day}`, `pengeluaran-value-shift2-day${day}`, `titipan-value-shift2-day${day}`, `tambahan1-value-shift2-day${day}`, `tambahan2-value-shift2-day${day}`, day, false);

        // Inisialisasi pertama
        updateSetCalculations(shift1, `total-all-shift1-day${day}`, `do-value-shift1-day${day}`, `pengeluaran-value-shift1-day${day}`, `titipan-value-shift1-day${day}`, `tambahan1-value-shift1-day${day}`, `tambahan2-value-shift1-day${day}`, `final-result-shift1-day${day}`, true, day);
        updateSetCalculations(shift2, `total-all-shift2-day${day}`, `do-value-shift2-day${day}`, `pengeluaran-value-shift2-day${day}`, `titipan-value-shift2-day${day}`, `tambahan1-value-shift2-day${day}`, `tambahan2-value-shift2-day${day}`, `final-result-shift2-day${day}`, false, day);
    });
});