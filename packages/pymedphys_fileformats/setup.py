from glob import glob
from os.path import abspath, dirname, join as pjoin
from setuptools import setup, find_packages

root = dirname(abspath(__file__))


def execfile(fname, globs, locs=None):
    locs = locs or globs
    exec(compile(open(fname).read(), fname, "exec"), globs, locs)


source_path = "src"
packages = find_packages(source_path)
root_packages = [package for package in packages if "." not in package]

assert len(root_packages) == 1
package = root_packages[0]
package_directory = pjoin(root, source_path, package)


def get_variable_from_file(filepath, variable):
    filepath_in_package = pjoin(package_directory, filepath)
    globs = {}
    execfile(filepath_in_package, globs)
    variable_value = globs[variable]

    return variable_value


version = get_variable_from_file("_version.py", "__version__")
install_requires = get_variable_from_file("_install_requires.py", "install_requires")


setup(
    name=package,
    version=version,
    python_requires=">=3.7",
    author="PyMedPhys Contributors",
    author_email="developers@pymedphys.com",
    description="",
    classifiers=[
        "Development Status :: 4 - Beta",
        "License :: OSI Approved :: GNU Affero General Public License v3 or later (AGPLv3+)",
        "Programming Language :: Python :: 3.7",
        "Topic :: Scientific/Engineering :: Medical Science Apps.",
        "Topic :: Scientific/Engineering :: Physics",
        "Intended Audience :: Science/Research",
        "Intended Audience :: Healthcare Industry",
    ],
    packages=packages,
    package_dir={"": source_path},
    include_package_data=True,
    package_data={package: []},
    license="AGPL-3.0-or-later",
    install_requires=install_requires,
    extras_require={"test": ["pytest"]},
)
