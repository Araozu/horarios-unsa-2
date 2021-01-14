ls > files
sed -E 's/(wall[0-9]*)\.([a-z]*)/cwebp \1\.\2 -o \1.webp/' files > ins
bash ins
rm ins
rm files
