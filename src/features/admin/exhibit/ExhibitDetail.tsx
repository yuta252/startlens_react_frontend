import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { makeStyles, Theme } from '@material-ui/core/styles';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Divider,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    MenuItem,
    InputLabel,
    Paper,
    Select,
    TextField,
    Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

import { AppDispatch } from '../../../app/store';
import {
    editMultiExhibit,
    fetchAsyncCreateMultiExhibit,
    fetchAsyncDeleteMultiExhibit,
    fetchAsyncUpdateMultiExhibit,
    initialState,
    selectEditedMultiExhibit,
    selectIsDisplayed,
    selectSelectedMultiExhibit,
    selectSelectedPicture,
} from './exhibitSlice';
import PictureDisplay from './PictureDisplay';
import PictureEdit from './PictureEdit';
import customStyles from './Exhibit.module.css';
import commonStyles from '../../../assets/Style.module.css';
import { MULTI_EXHIBIT } from '../../types';
import { langCategoryObj } from '../../../app/constant';


const useStyles = makeStyles( (theme: Theme) => ({
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2)
    },
    preview: {
        padding: '12px',
    },
    displayedPictureAvatar: {
        backgroundColor: theme.palette.grey[500],
        width: '100%',
        height: '250px'
    },
    uploadPictureButton: {
        width: "140px",
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    addMultiExhibitButton: {
        width: "110px",
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
    },
    formControl: {
        minWidth: "180px",
    },
}));


const ExhibitDetail: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();

    const editedMultiExhibit = useSelector(selectEditedMultiExhibit);
    const isDisplayed = useSelector(selectIsDisplayed)
    const selectedMultiExhibit = useSelector(selectSelectedMultiExhibit);
    const selectPicture = useSelector(selectSelectedPicture)

    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [expanded, setExpanded] = React.useState<number | false>(false);

    const isDisabled: boolean = (editedMultiExhibit.lang.length === 0 || editedMultiExhibit.name.length === 0 ||
        editedMultiExhibit.description.length === 0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        dispatch(editMultiExhibit({...editedMultiExhibit, [name]: value}))
    };

    const handleSelectLangChange = (e: React.ChangeEvent< {value: unknown} >) => {
        const value = e.target.value as string;
        dispatch(editMultiExhibit({...editedMultiExhibit, lang: value}))
    };

    let langOptions = Object.keys(langCategoryObj).map( (key) => (
        <MenuItem key={key} value={key}>
            {langCategoryObj[key]}
        </MenuItem>
    ));

    const handleOpen = () => {
        setOpen(true);
        // initialize editMultiExhibit for a new registration
        dispatch(editMultiExhibit({...initialState.editedMultiExhibit, exhibitId: selectPicture.id}))
    }

    const handleEditOpen = (multiExhibit: MULTI_EXHIBIT) => {
        dispatch(editMultiExhibit(multiExhibit));
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (panel: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    }

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    }

    const createMultiExhibitAction = async () => {
        const postData: MULTI_EXHIBIT = editedMultiExhibit;
        const result = await dispatch(fetchAsyncCreateMultiExhibit(postData));
        if (fetchAsyncCreateMultiExhibit.rejected.match(result)) {
            return false
        }
        if (fetchAsyncCreateMultiExhibit.fulfilled.match(result)) {
            setOpen(false);
        }
    }

    const updateMultiExhibitAction = async () => {
        const postData: MULTI_EXHIBIT = editedMultiExhibit;
        const result = await dispatch(fetchAsyncUpdateMultiExhibit(postData));
        if (fetchAsyncUpdateMultiExhibit.rejected.match(result)) {
            return false
        }
        if (fetchAsyncUpdateMultiExhibit.fulfilled.match(result)) {
            dispatch(editMultiExhibit(initialState.editedMultiExhibit));
            setOpen(false);
        }
    }

    const deleteMultiExhibitActin = async (multiExhibit: MULTI_EXHIBIT) => {
        await dispatch(fetchAsyncDeleteMultiExhibit(multiExhibit))
        handleCloseConfirm()
    }

    return (
        <Grid container spacing={1}>
            <Grid container item>
                <Grid item md={12}>
                    <div>
                        <Typography variant="h6">{selectedMultiExhibit[0]!.name}</Typography>
                    </div>
                    <Divider className={classes.divider}/>
                </Grid>
            </Grid>
            <Grid container item>
                <Grid item md={12}>
                    <Paper className={classes.paper}>
                        {isDisplayed ? <PictureDisplay /> : <PictureEdit />}
                    </Paper>
                </Grid>
            </Grid>
            <Grid container item>
                <Grid item md={12}>
                    <Paper className={classes.paper}>
                        <div className={customStyles.multi_exhibit_list_header}>
                            <Typography>多言語情報</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                size="small"
                                className={classes.addMultiExhibitButton}
                                onClick={
                                    () => handleOpen()
                                }
                                disableElevation
                            >
                                新規登録
                            </Button>
                        </div>
                        <div className={commonStyles.spacer__small} />
                        {selectedMultiExhibit.map( (multiExhibit: MULTI_EXHIBIT) =>
                            <Accordion key={multiExhibit.id} expanded={expanded === multiExhibit.id} onChange={handleChange(multiExhibit.id)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography className={classes.heading}>{langCategoryObj[multiExhibit.lang]}</Typography>
                                    <Typography className={classes.secondaryHeading}>{multiExhibit.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {multiExhibit.description}
                                    </Typography>
                                </AccordionDetails>
                                <div className={customStyles.multi_exhibit_btn_wrapper}>
                                    <div onClick={() => handleEditOpen(multiExhibit)}>
                                        <IconButton>
                                            <EditIcon />
                                        </IconButton>
                                    </div>
                                    <div onClick={() => handleOpenConfirm()}>
                                        <IconButton>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                <Dialog
                                    open={openConfirm}
                                    onClose={handleCloseConfirm}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"登録情報を本当に削除しますか？"}</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        登録情報を削除する場合は削除ボタンを押してください。
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleCloseConfirm} color="primary">
                                        キャンセル
                                    </Button>
                                    <Button onClick={() => deleteMultiExhibitActin(multiExhibit)} color="primary" autoFocus>
                                        削除
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </Accordion>
                        )}
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen>
                            <DialogTitle id="form-dialog-title">多言語情報の新規登録</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    登録したい言語を選択し入力してくだいさい。
                                </DialogContentText>
                                <div className={commonStyles.spacer__medium} />
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="category-select-label">カテゴリー名</InputLabel>
                                    <Select
                                        labelId="category-select-label"
                                        name="lang"
                                        value={editedMultiExhibit.lang}
                                        onChange={handleSelectLangChange}
                                    >
                                        {langOptions}
                                    </Select>
                                </FormControl>
                                <div className={commonStyles.spacer__medium} />
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="画像の名称"
                                    type="text"
                                    name="name"
                                    value={editedMultiExhibit.name}
                                    onChange={handleInputChange}
                                />
                                <div className={commonStyles.spacer__medium} />
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="画像の紹介文"
                                    type="text"
                                    name="description"
                                    multiline
                                    rows={5}
                                    value={editedMultiExhibit.description}
                                    onChange={handleInputChange}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    キャンセル
                                </Button>
                                <Button
                                    onClick={() => editedMultiExhibit.id ? updateMultiExhibitAction() : createMultiExhibitAction()}
                                    disabled={isDisabled} color="primary"
                                >
                                    {editedMultiExhibit.id ? "更新" : "登録"}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ExhibitDetail
